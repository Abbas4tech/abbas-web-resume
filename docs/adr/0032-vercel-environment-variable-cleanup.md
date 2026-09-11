---
status: accepted
date: 2026-09-11
---

# 32. Vercel Environment Variable Cleanup & Per-Environment Contentful Mapping

## Context

The Vercel project had accumulated environment variables from every naming scheme this
project's Contentful integration had ever gone through — old and current names coexisting,
some scoped to only some of Production/Preview/Development, one (`CONTENTFUL_SPACE_ID`) still
holding a 714-day-old value that predated the ADR 0019 legacy-space migration. `.env.local` had
already been reduced to the current, correct set of 5 variables locally; Vercel had never been
brought in line with that reduction.

Auditing what Vercel actually had (`vercel env ls`) against what the deployed app's runtime
code (`src/contentful/lib/client.ts`) actually reads found something more serious than clutter:
**Production was missing `CONTENTFUL_ENVIRONMENT` and `CONTENTFUL_CDA_TOKEN` entirely** — only
Development/Preview had them, added 82 days prior without Production. Production had never
been able to query live Contentful data correctly before this was found. (Fixing this
misconfiguration is also what surfaced the schema-drift incident in ADR 0031 — Production
started querying for real for the first time and immediately hit a schema its content types
had never been synced against.)

## Decision

Reduced Vercel's environment variables to exactly the 4 the running app reads at request time:
`CONTENTFUL_SPACE_ID`, `CONTENTFUL_CDA_TOKEN`, `CONTENTFUL_API_BASE_URL`, `CONTENTFUL_ENVIRONMENT`.

- **`CONTENTFUL_MANAGEMENT_TOKEN` deliberately excluded from Vercel.** Only
  `pnpm contentful:setup` and other local/CI schema-management scripts use it — the deployed
  Next.js app never reads it. A write-capable Contentful credential sitting in a runtime
  environment that has no code path that uses it is unnecessary exposure with zero
  functional benefit.
- **`CONTENTFUL_ENVIRONMENT` is the one value that legitimately differs by Vercel scope**:
  `production` on the Production environment, `development` on both Preview and local
  Development — matching how Preview/local work has always pointed at the non-prod Contentful
  environment. Every other variable is identical across all three scopes (space, CDA token,
  and base URL are the same regardless of which Contentful environment is being queried).
- Removed 10 legacy variable names — `CONTENTFUL_API_KEY`, `CONTENTFUL_APPLICATION_DATA_ID`,
  `CONTENTFUL_BASE_URL`, `CONTENTFUL_ENVIRONMENT_ID`, `CONTENTFUL_EXPERIENCE_PAGE_KEY`,
  `CONTENTFUL_HOME_PAGE_KEY`, `CONTENTFUL_PAGES_KEY`, `CONTENTFUL_PROJECTS_PAGE_KEY`,
  `CONTENTFUL_SKILLS_PAGE_KEY`, `STARTING_URL` — from wherever they existed across all three
  scopes. None are referenced anywhere in the current codebase.
- Refreshed `CONTENTFUL_SPACE_ID` and `CONTENTFUL_API_BASE_URL` to current values across all
  three scopes rather than trusting the existing (but correctly-named) entries, since
  `CONTENTFUL_SPACE_ID`'s 714-day age strongly suggested a pre-migration value.
- **`VERCEL_OIDC_TOKEN`** (visible in a local `vercel env pull` output) is explicitly out of
  scope here — it's auto-managed by Vercel's OIDC federation feature under a different Project
  Settings toggle, not a variable to add/remove/edit in this list.

## Considered Options

- **Leave `CONTENTFUL_MANAGEMENT_TOKEN` in Vercel to match `.env.local` exactly.** Rejected —
  `.env.local` is a local dev convenience file that legitimately needs it for running
  `contentful:setup` locally; Vercel's runtime has no equivalent use for a write-capable
  credential, so 1:1 parity with `.env.local` isn't actually the right goal here.
- **Give Preview its own third Contentful environment, distinct from local Development.**
  Rejected (not raised as a real need) — Preview and local `vercel dev` have always shared the
  same non-prod content; introducing a third environment would be new schema-management
  surface (a third target for every future `contentful:setup` run) for no expressed use case.

## Consequences

### Positive
- Production actually queries live Contentful data correctly for the first time — the
  precondition for ADR 0031's incident to even become visible, and for it to be fixed rather
  than staying latently broken.
- Vercel's variable list now matches exactly what the code reads, closing the gap between
  `.env.local` (already reduced) and the deployed project (not).
- No live Contentful environment name is hardcoded anywhere outside this single
  per-Vercel-scope mapping — a future third scope only needs one new `CONTENTFUL_ENVIRONMENT`
  value, not a code change.

### Negative / Trade-offs
- No automated check keeps Vercel's variable set in sync with `.env.local` or the codebase's
  actual `process.env` reads going forward — this was a one-time manual audit
  (`vercel env ls` cross-referenced against `client.ts`), not a standing guardrail. A future
  drift of the same kind (a new variable added to one scope and forgotten on another) would
  currently only surface the way this one did: `verify-contentful-schema` (ADR 0031) covers the
  Contentful-schema side of that, but not a Vercel-side misconfiguration where a variable is
  simply absent for one scope's build.
