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

| Environment | Contentful | Purpose |
|-------------|-----------|---------|
| `development` | `development` environment | Local dev, PR preview |
| `production` | `master` environment | Live production |

The CI pipeline selects the Contentful environment automatically based on the target branch:

```yaml
CONTENTFUL_ENVIRONMENT: ${{ github.base_ref == 'master' && 'production' || 'development' }}
```

---

## CI/CD Pipeline Architecture

Defined in `.github/workflows/ci.yml`. See [ADR 0010](./adr/0010-ci-cd-pipeline-architecture.md).

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
      ├── unit-test ─────────────── unit-test-coverage/
      ├── e2e-test (4-way shard) ── blob-report-{1..4}/ ──▶ merge-e2e-reports ── playwright-report/
      ├── build
      └── build-storybook ───────── storybook-static/
```

| Job | Command | Artifact |
|-----|---------|---------|
| `lint` | `pnpm check` | — |
| `typecheck` | `pnpm tsc --noEmit` | — |
| `unit-test` | `pnpm test:coverage` | `unit-test-coverage/` |
| `e2e-test` (×4 shards) | `playwright test --shard=N/4` | `blob-report-N/` |
| `merge-e2e-reports` | `playwright merge-reports` | `playwright-report/` |
| `build` | `pnpm build` (cached `.next/cache`) | — |
| `build-storybook` | `pnpm build-storybook` | `storybook-static/` |

Each job installs its own dependencies (fast — pnpm's store is cached by `actions/setup-node`'s `cache: pnpm`), so wall-clock time is roughly the slowest single job rather than the sum of all of them. `e2e-test` is the one that needed real parallelism: it's split into 4 shards via Playwright's `--shard` flag, each uploading a `blob` report, merged into one HTML report by `merge-e2e-reports` afterward.

Only `build` receives the Contentful secrets — it's the only job that fetches real content (`next build` statically renders pages from it). Every other job runs against the MSW-mocked fixture site, which matches requests by GraphQL operation name rather than URL or credentials, so it needs no secrets at all.

All artifacts are retained for **14 days**.

---

## Release Pipeline

Defined in `.github/workflows/release.yml`.

On merge to `master`, a Python release script runs:

```bash
python scripts/ci/manage-release.py
```

Steps:
1. Runs `pnpm changeset version` — bumps `package.json` and updates `CHANGELOG.md`
2. Detects if changeset files were consumed
3. Uses the GitHub CLI (`gh`) to open a **"Version Packages"** PR with the version bump

This gives manual review control over the final published version before production deployment.

---

## Environment Variables in CI

Contentful secrets are injected from GitHub repository secrets:

| Secret | Injected As |
|--------|------------|
| `CONTENTFUL_SPACE_ID` | `CONTENTFUL_SPACE_ID` |
| `CONTENTFUL_CDA_TOKEN` | `CONTENTFUL_CDA_TOKEN` |
| `CONTENTFUL_API_BASE_URL` | `CONTENTFUL_API_BASE_URL` |

> Secrets are defined in the GitHub repository settings under `Settings → Secrets and variables → Actions`.

---

## Vercel Setup Script

`vercel-setup.sh` is a helper script for initializing Vercel project configuration from the CLI. Run it once during initial project setup to link the repository to a Vercel project and configure environment variables.

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

- [ ] CI pipeline passes (all jobs green)
- [ ] Changeset file present
- [ ] Contentful schema scripts updated (if schema changed)
- [ ] Generated types committed (`pnpm generate`)
- [ ] Storybook build passes
- [ ] Visual regression approved in Chromatic (if applicable)

---

## Related ADRs

- [ADR 0010 — CI/CD Pipeline Architecture](./adr/0010-ci-cd-pipeline-architecture.md)
- [ADR 0007 — Playwright Production Setup](./adr/0007-playwright-production-setup.md)
- [ADR 0023 — CI Pipeline Parallelization & Branch-Name Correction](./adr/0023-ci-pipeline-parallelization.md)
