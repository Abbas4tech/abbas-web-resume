# Chapter 10 — Deployment

This chapter documents the hosting setup, environment strategy, and CI/CD pipeline architecture.

---

## Hosting: Vercel

The application is hosted on **Vercel** using native GitHub integration. Every push triggers a deployment automatically.

| Branch | Deployment |
|--------|-----------|
| `master` | Production (`https://your-domain.vercel.app`) |
| `develop-draft` | Preview environment |
| Any PR branch | Per-PR preview URL |

Vercel handles:
- Edge network delivery (CDN)
- Serverless function runtime for Next.js API routes and SSR
- Preview environments per PR
- OIDC-based secure secrets injection (`VERCEL_OIDC_TOKEN`)

> **No custom Docker containers or server configuration is needed.** Vercel's native Next.js integration handles everything.

---

## Environments

| Vercel Scope | Contentful Environment (`CONTENTFUL_ENVIRONMENT`) | Purpose |
|--------------|----------------------------------------------------|---------|
| Development (local `vercel dev` / `.env.local`) | `development` | Local dev |
| Preview (any non-`master` branch/PR) | `development` | PR preview |
| Production (`master`) | `production` | Live production |

`CONTENTFUL_ENVIRONMENT` is the **only** Contentful variable that differs across these three Vercel scopes —
`CONTENTFUL_SPACE_ID`, `CONTENTFUL_CDA_TOKEN`, and `CONTENTFUL_API_BASE_URL` are identical everywhere. See
[ADR 0032](./adr/0032-vercel-environment-variable-cleanup.md).

This selection happens at the **Vercel project settings** level (per-scope environment variables), not in
CI — nothing in `.github/workflows/ci.yml` picks a Contentful environment based on which branch a PR targets.
The `build` CI job (below) always uses `development` regardless of branch, since it never actually queries
live Contentful data at build time; the `verify-contentful-schema` job checks **both** environments on every
run, unconditionally, specifically so drift in either one is caught before merge — see [ADR 0031](./adr/0031-contentful-schema-parity-verification.md).

---

## CI/CD Pipeline Architecture

Defined in `.github/workflows/ci.yml`. See [ADR 0010](./adr/0010-ci-cd-pipeline-architecture.md) and [ADR 0023](./adr/0023-ci-pipeline-parallelization.md).

### Pipeline Trigger

```yaml
on:
  push:
    branches: ['develop-draft', '**/develop-draft/**', 'feat/develop-draft/**']
  pull_request:
    branches: [master, 'develop-draft', '**/develop-draft/**', 'feat/develop-draft/**']

concurrency:
  group: ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

A new push to the same branch/PR cancels whatever CI run was already in flight for it, instead of letting a now-superseded run finish and burn runner minutes.

### Job Graph

As of [ADR 0023](./adr/0023-ci-pipeline-parallelization.md), everything past the changeset gate runs as **parallel sibling jobs** on separate runners instead of sequential steps in one job — the old single-job pipeline could take 25-48 minutes end to end because every step, including all 6 Playwright device projects, ran one after another on one machine.

```
check-changeset
      │
      ├── lint
      ├── typecheck
      ├── unit-test ──────────────────── unit-test-coverage/
      ├── e2e-test (4-way shard) ─────── blob-report-{1..4}/ ──▶ merge-e2e-reports ── playwright-report/
      ├── build
      ├── verify-contentful-schema (×2: development, production)
      ├── build-storybook ─────────────── storybook-static/
      └── storybook-a11y
```

| Job | Command | Artifact |
|-----|---------|---------|
| `lint` | `pnpm check` | — |
| `typecheck` | `pnpm tsc --noEmit` | — |
| `unit-test` | `pnpm test:coverage` | `unit-test-coverage/` |
| `e2e-test` (×4 shards) | `playwright test --shard=N/4` | `blob-report-N/` |
| `merge-e2e-reports` | `playwright merge-reports` | `playwright-report/` |
| `build` | `pnpm build` (cached `.next/cache`) | — |
| `verify-contentful-schema` (×2 matrix: development, production) | `python scripts/contentful/verify-contentful-schema.py` | — |
| `build-storybook` | `pnpm build-storybook` | `storybook-static/` |
| `storybook-a11y` | `pnpm test-storybook:ci` (axe checks via `.storybook/test-runner.ts`) | — |

Each job installs its own dependencies (fast — pnpm's store is cached by `actions/setup-node`'s `cache: pnpm`), so wall-clock time is roughly the slowest single job rather than the sum of all of them. `e2e-test` is the one that needed real parallelism: it's split into 4 shards via Playwright's `--shard` flag, each uploading a `blob` report, merged into one HTML report by `merge-e2e-reports` afterward. `verify-contentful-schema` needs no pnpm/Node install at all — it's pure Python (stdlib only), reading the already-checked-out generated GraphQL SDK file directly.

**Which jobs touch real Contentful secrets:**

- `build` receives `CONTENTFUL_SPACE_ID`/`CONTENTFUL_CDA_TOKEN`/`CONTENTFUL_API_BASE_URL` as real secrets,
  but hardcodes `CONTENTFUL_ENVIRONMENT: development` and never actually calls them — the catch-all route
  has no `generateStaticParams`, so it's fully dynamic and `next build` never queries Contentful. A green
  `build` only proves the code compiles, nothing about schema correctness against either environment.
- `verify-contentful-schema` is the job that actually exercises real Contentful data, against **both**
  `development` and `production` via a matrix, using the same generated SDK the deployed app calls at
  request time. This is what would have caught (and, once added, does catch) the schema-drift incident
  described in [ADR 0031](./adr/0031-contentful-schema-parity-verification.md).
- `e2e-test` needs no real secrets at all — it runs entirely against the MSW-mocked fixture site, which
  matches requests by GraphQL operation name rather than URL or credentials. It still needs
  *syntactically valid* placeholder values (`mock-space-id`, etc.) so the client's URL-building code
  doesn't throw on `undefined` before MSW gets a chance to intercept.
- `lint`, `typecheck`, `build-storybook`, `storybook-a11y` need no Contentful configuration at all.

All artifacts are retained for **14 days**.

---

## Release Pipeline

Defined in `.github/workflows/release.yml`. Triggered on every push to `master`.

```bash
python scripts/ci/manage-release.py
```

Current step order (fixed by [ADR 0033](./adr/0033-release-pipeline-branch-reset-ordering.md) — the branch
must be positioned *before* versioning runs, not after, or `git reset --hard` silently discards the
uncommitted version bump):

1. Position the `changeset-release/master` branch on top of `master`'s current commit — fetch and
   hard-reset it if the branch already exists remotely (from a prior, still-open Version Packages PR), or
   branch fresh from the current checkout if it doesn't. Either way the working tree now exactly matches
   `master`, clean.
2. Run `pnpm changeset version` against that clean base — bumps `package.json` and updates `CHANGELOG.md`
   by consuming pending `.changeset/*.md` files.
3. Check `git status --porcelain`; only if there's something to commit, `git add .` and commit.
4. Push the branch and open (or update) a **"Version Packages"** PR via the GitHub CLI (`gh`), using
   `GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`.

This gives manual review control over the final published version before it merges to `master` and
triggers a production deployment. Because step 1 always rebuilds the branch as exactly "master + one fresh
version-bump commit," it's self-healing across releases — it can no longer accumulate drift the way it did
before ADR 0033's fix (previously: "gets ahead or behind master," and a deterministic
`nothing to commit, working tree clean` failure on every release after the first one with an already-open
Version Packages PR).

The changeset **gate** itself (whether a PR is required to include a `.changeset/*.md` file at all) is a
separate, earlier check — `check-changeset` in `ci.yml`, running `python scripts/ci/check-changeset.py` —
not part of the release pipeline described above.

---

## Environment Variables in CI

Contentful secrets are injected from GitHub repository secrets, used by both `build` and
`verify-contentful-schema`:

| Secret | Injected As |
|--------|------------|
| `CONTENTFUL_SPACE_ID` | `CONTENTFUL_SPACE_ID` |
| `CONTENTFUL_CDA_TOKEN` | `CONTENTFUL_CDA_TOKEN` |
| `CONTENTFUL_API_BASE_URL` | `CONTENTFUL_API_BASE_URL` |

`CONTENTFUL_ENVIRONMENT` is not a secret — it's set inline per job (`development` for `build`, a
`[development, production]` matrix for `verify-contentful-schema`).

> Secrets are defined in the GitHub repository settings under `Settings → Secrets and variables → Actions`.

---

## Vercel Setup Script

`vercel-setup.sh` (repo root) is a helper for a developer's local machine: it checks that `pnpm`/`vercel`
CLI are installed (installing the Vercel CLI globally via `pnpm add -g vercel` if missing), runs
`vercel login`, then `vercel env pull` to fetch the project's current environment variables into a local
`.env` file. It does not configure or modify Vercel's project settings — see
[ADR 0032](./adr/0032-vercel-environment-variable-cleanup.md) for how that variable set is actually managed
(currently a manual `vercel env` audit via the Vercel CLI, cross-referenced against
`src/contentful/lib/client.ts`'s actual `process.env` reads — there is no automated drift check yet).

---

## Caching Strategy

The CI pipeline uses aggressive caching to minimize build times:

| Cache | Key |
|-------|-----|
| pnpm store | `pnpm-lock.yaml` hash |
| Next.js build cache | `pnpm-lock.yaml` + source file hashes |

Playwright's browser binaries are deliberately **not** cached — Playwright's own CI guidance notes that restoring a browser-binary cache takes about as long as a fresh `npx playwright install --with-deps` download, so the cache step was pure overhead with no real speedup. See ADR 0023.

---

## Deployment Checklist

Before merging a PR to `master`:

- [ ] CI pipeline passes (all jobs green, including both `verify-contentful-schema` matrix legs)
- [ ] Changeset file present (or an intentionally empty one — see [ADR 0033](./adr/0033-release-pipeline-branch-reset-ordering.md) — for a docs-only/non-package change that still needs to pass `check-changeset`)
- [ ] Contentful schema scripts updated (if schema changed) and pushed to **both** environments via `pnpm contentful:setup` (targeting each via `CONTENTFUL_ENVIRONMENT`) — a push to only one environment is exactly the drift `verify-contentful-schema` exists to catch
- [ ] Generated types committed (`pnpm generate`)
- [ ] Storybook build and `storybook-a11y` checks pass
- [ ] Vercel environment variables still match what `src/contentful/lib/client.ts` (and the rest of the app) actually reads, if you touched env var usage — see [ADR 0032](./adr/0032-vercel-environment-variable-cleanup.md)

---

## Related ADRs

- [ADR 0010 — CI/CD Pipeline Architecture](./adr/0010-ci-cd-pipeline-architecture.md)
- [ADR 0007 — Playwright Production Setup](./adr/0007-playwright-production-setup.md)
- [ADR 0023 — CI Pipeline Parallelization & Branch-Name Correction](./adr/0023-ci-pipeline-parallelization.md)
- [ADR 0024 — Storybook Runtime Fixes & CMS Block Registry Expansion](./adr/0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md)
- [ADR 0031 — Contentful Schema Parity Verification](./adr/0031-contentful-schema-parity-verification.md)
- [ADR 0032 — Vercel Environment Variable Cleanup](./adr/0032-vercel-environment-variable-cleanup.md)
- [ADR 0033 — Release Pipeline Branch-Reset Ordering Bug](./adr/0033-release-pipeline-branch-reset-ordering.md)
