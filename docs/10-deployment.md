# Chapter 10 — Deployment

This chapter documents the hosting setup, environment strategy, and CI/CD pipeline architecture.

---

## Hosting: Vercel

The application is hosted on **Vercel** using native GitHub integration. Every push triggers a deployment automatically.

| Branch | Deployment |
|--------|-----------|
| `main` | Production (`https://your-domain.vercel.app`) |
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
    branches: [main, 'develop-draft', '**/develop-draft/**', 'feat/develop-draft/**']
```

### Job 1: Check Changeset

**Always runs first.**

```bash
python scripts/ci/check-changeset.py
```

Verifies that a `.changeset/*.md` file is present in the PR diff. Fails immediately if missing — no lint or tests are wasted.

### Job 2: Lint, Test, and Build

Runs after Job 1 passes.

| Step | Command | Artifact |
|------|---------|---------|
| Install pnpm | `pnpm/action-setup@v3 v10.29.1` | — |
| Install Node | `actions/setup-node@v4 node 22` | — |
| Install deps | `pnpm install` (cached) | — |
| Lint & format | `pnpm check` | — |
| Typecheck | `pnpm tsc --noEmit` | — |
| Unit tests | `pnpm test:coverage` | `unit-test-coverage/` |
| Install Playwright | `npx playwright install --with-deps` (cached) | — |
| E2E tests | `pnpm test:e2e` | `playwright-report/` |
| Build Next.js | `pnpm build` (cached `.next/`) | — |
| Build Storybook | `pnpm build-storybook` | `storybook-static/` |

All artifacts are retained for **14 days** per PR.

---

## Release Pipeline

Defined in `.github/workflows/release.yml`.

On merge to `main`, a Python release script runs:

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
| Playwright browsers | `pnpm-lock.yaml` hash |
| Next.js build cache | `pnpm-lock.yaml` + source file hashes |

---

## Deployment Checklist

Before merging a PR to `main`:

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
