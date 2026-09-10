---
status: accepted
date: 2026-09-11
---

# 31. Contentful Schema Parity Verification

## Context

Shortly after merging `develop-draft` into `master`, the deployed Production site 500'd on
every page. Root cause: `Cannot query field "favicon" on type "SeoMetadata"` — a GraphQL
schema mismatch. `pnpm contentful:setup` (the script that pushes this repo's content-type
definitions to Contentful) had, across this entire project's history, only ever been run
against the `development` environment. `production` had real content (126 entries, all 4
real pages) but a stale schema that had drifted out of sync with what the app's queries
actually request.

This was invisible everywhere it should have been caught:

- **`pnpm build` in CI** (`build` job) already had real Contentful secrets and even
  conditionally set `CONTENTFUL_ENVIRONMENT` to `production` for PRs targeting `master` —
  but `next build` never actually calls these queries. The catch-all route
  (`src/app/(app)/[[...slug]]/page.tsx`) has no `generateStaticParams`, so it's fully
  dynamic — server-rendered per request, not at build time. A green build proved the code
  compiled; it proved nothing about whether the target environment's live schema still
  matched what the code queries. The existing base-branch conditional gave false confidence.
- **Unit and E2E tests** run against MSW-mocked fixtures (`tests/mocks/handlers.ts` matches
  by GraphQL operation name) that always return exactly the shape the adapters expect,
  regardless of what a real Contentful environment's schema actually looks like. No mock-based
  test can ever catch two real environments disagreeing with each other.
- A separate, contributing misconfiguration compounded this: Production's Vercel project was
  missing `CONTENTFUL_ENVIRONMENT`/`CONTENTFUL_CDA_TOKEN` entirely until an unrelated env-var
  cleanup pass fixed it — so Production had never actually been querying live Contentful data
  correctly before that fix. The schema drift was real but dormant; fixing the Vercel
  misconfiguration is what made Production start querying for real and immediately hit it.

## Decision

Added `scripts/contentful/verify-contentful-schema.py` — pure Python, standard library only, matching
this repo's existing Python-orchestrated CI convention (`check-changeset.py`,
`manage-release.py`) rather than a TypeScript/`tsx` script. It talks to Contentful's GraphQL
API directly over `urllib` — no Node/pnpm install needed for this job at all.

The one real design problem with a from-scratch Python rewrite is the same one this whole ADR
is about: a hand-copied second version of the app's GraphQL queries would itself be a second
thing that could silently drift from the real one. Solved by not hand-copying anything —
the script parses the *already-generated* `src/contentful/generated/contentful-sdk.generated.ts`
(the artifact `graphql-codegen` produces from the real `.graphql` sources), extracting every
`export const X = gql\`...\`;` block via regex and resolving each one's `${OtherDoc}`
template-literal interpolations itself (a small dependency-closure walk: collect each
operation's transitive fragment set, emit each fragment's definition exactly once). This
reproduces exactly what `graphql-tag`'s `gql` + `print()` do at JS runtime, just via string
assembly instead of a real GraphQL parser — and because it reads the generated file rather than
a hand-maintained copy, any `.graphql` source change that flows through codegen is picked up
here automatically, with no manual sync step to forget.

It calls the two real operations — `GetLayout`, and `GetPageByPath` for every path returned by
a lightweight `pageCollection` discovery query (not part of the generated SDK; its only job is
enumerating real paths to feed into the real query) — against whatever `CONTENTFUL_ENVIRONMENT`
is set, and fails loudly (non-zero exit, a `::error::` annotation, per-query error detail) on
either a GraphQL `errors` array or an HTTP-level failure (bad environment name, auth failure),
so a schema-drift failure and a credentials failure both surface clearly.

New CI job `verify-contentful-schema` in `ci.yml`, matrix over `[development, production]`,
reusing the exact same three secrets the `build` job already had (no new credential exposure) —
and needing only a Python setup step, no pnpm/Node install, since the script has no other
dependency. Runs unconditionally on both environments regardless of which branch a PR targets,
so drift in either direction fails immediately — not just the direction the old base-branch
conditional on `build` happened to check. Corrected that job's env-block comment, which had
asserted `next build` "statically renders pages from" Contentful — the exact false belief that
let this ship.

## Considered Options

- **Make this a Vitest spec instead of a standalone script.** Rejected — it needs live network
  access to a real third-party service and real credentials; running it inside `pnpm test`
  would make the fast, offline, MSW-mocked unit suite slow and flaky, and conflate two
  fundamentally different kinds of test (pure logic vs. live-environment integration).
  `contentful:setup` already established the "real Contentful, so it's a script, not a spec"
  precedent in this codebase.
- **A TypeScript script importing the real `contentfulSdk` directly, called from a thin
  Python CI wrapper.** Built first, then reconsidered in favor of the pure-Python version
  above: it worked, but every job running it still needed the full pnpm/Node install this repo's
  Python-orchestrated CI jobs otherwise avoid, purely to run one script. The pure-Python version
  gets the same "never drifts from the real queries" guarantee a different way (parsing the
  generated codegen artifact instead of importing the SDK module directly), for a strictly
  lighter, faster, dependency-free job.
- **Fix it by making the `build` job's existing base-branch conditional actually mean
  something (e.g., force the dynamic route to prerender).** Rejected — would only check the
  environment matching whichever branch the PR happens to target, never both, and forcing
  static generation would require an unrelated architecture change (build-time
  `generateStaticParams` for content that's meant to update without a redeploy).
- **Only run schema verification on PRs targeting `master`.** Rejected — drift can happen in
  either direction (a schema pushed to `development` and forgotten for `production`, or
  vice versa); checking both unconditionally on every PR catches it regardless of which one
  fell behind, for the cost of two extra parallel jobs that only need read-only credentials
  already in use elsewhere.

## Consequences

### Positive
- The exact failure mode that caused this incident — a query the app actually issues failing
  against a real environment's real schema — now fails CI before merge, on every PR, for both
  environments, not just the one matching the PR's target branch.
- Corrects a specific false belief embedded in the CI config itself (the `build` job's
  now-fixed comment), not just the symptom.
- No new secrets or credential surface — reuses the three already granted to `build`.
- The job itself needs nothing beyond checkout + Python — no pnpm install, no Node setup, no
  `node_modules` — since it reads the generated file as plain text and talks HTTP directly.

### Negative / Trade-offs
- Two more CI jobs per PR (real network calls to Contentful) add a small amount of wall time
  and a small amount of load against the live space, though negligible next to the E2E matrix.
- The regex-based `gql` template-literal resolution assumes `contentful-sdk.generated.ts` keeps
  its current codegen output shape (`export const X = gql\`...\`;` blocks with `${Y}`
  interpolations). A codegen plugin/config change that alters this shape would need this
  script's parsing updated alongside it — a real coupling, though a narrow and clearly-named one.
- This only verifies the queries the codegen'd SDK currently issues (`GetLayout`,
  `GetPageByPath`) — a schema regression in a field that's fetched but genuinely never queried
  anywhere (dead code) wouldn't be caught. Acceptable: verifying what the app actually calls is
  exactly the right scope, not a full schema-equality diff between environments.
- Doesn't retroactively fix the `layout` content type's own lingering drift on `production`
  (a legacy `favicon` field Contentful won't let a blunt overwrite silently drop — needs an
  explicit omit-then-delete, which `contentful:setup`'s current field-array-replace approach
  doesn't do). Left as a known, non-blocking follow-up — `layout`'s queries already pass this
  new check as-is.

## Amendment — Missing favicon content in production

Fixing the schema (this ADR's original Decision) made every `verify-contentful-schema` query
pass, but a separate, narrower gap surfaced right after: all 4 `SeoMetadata` entries in
`production` (one per real page) had their `favicon` *field* correctly present in the schema
now, but no *value* — `favicon: null` on every one, while every corresponding `development`
entry pointed at the same real asset. Content and schema drift independently; fixing one
doesn't imply the other is fixed. This is exactly the class of gap `verify-contentful-schema`
is *not* designed to catch (it verifies the query succeeds, not that every field it returns is
non-null) — a deliberate scope decision (see Consequences above), not an oversight, but worth
noting as the practical edge of that scope.

Root cause went one level deeper than a missing entry field: the underlying image **Asset**
(`79EymWAl48qVLxSB7ifsFy`) didn't exist in `production` at all. Assets are scoped per
environment exactly like entries and content types — `production` never had this file uploaded
to it in the first place, so there was nothing for any entry to link to.

Fixed by, all against the live Management API: creating the same asset (same ID, sourced from
`development`'s already-hosted file) in `production`, processing and publishing it, then
linking and publishing it on all 4 `production` `SeoMetadata` entries. Verified two ways: via
the Management API (asset shows published in `production`) and via the real public CDA GraphQL
endpoint (`GetPageByPath` for a real page now returns the same favicon title/image in both
environments — each hosted under its own per-environment copy of the file, as expected).

Confirmed `layout.globalSeo` is `null` in *both* environments, consistently — not a regression,
not part of what "same as development" meant here, left untouched.
