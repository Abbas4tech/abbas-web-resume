# 23. CI Pipeline Parallelization & Branch-Name Correction

Date: 2026-09-07

## Status

Accepted and implemented

## Context

The CI pipeline (`.github/workflows/ci.yml`) grew, step by step, into a single `verify-and-build` job that ran everything — lint, typecheck, unit tests with coverage, Playwright browser install, the full 6-device-project E2E suite, `next build`, and `build-storybook` — as sequential steps on one runner. None of these steps depend on each other's *output* (build doesn't need the E2E report; unit tests don't need Storybook); they were only sequential because they were written as steps in one job rather than as separate jobs.

Real-world evidence this was a problem: a GitHub Actions run on this branch (`CI-E2E-Report.txt`, analyzed in [ADR 0022](./0022-e2e-journey-and-fixture-expansion.md)'s PR 11) took **~48 minutes on the E2E step alone**, and the user reported a subsequent local `pnpm test:e2e` run "still going on" after 25 minutes. Even after PR 11 fixed the dominant cause of E2E retry overhead (a systemic `color-contrast` false-positive rate), the pipeline's structure meant every other step — lint, typecheck, unit tests, the Next.js build, the Storybook build — still had to wait for E2E to finish before they could even start, purely because they were later steps in the same job.

Separately, while reading the pipeline end to end, a second, unrelated defect surfaced: `release.yml` triggers on `push: branches: [main]`, and `scripts/ci/manage-release.py` hardcodes `main` in three places (`git reset --hard main`, `gh pr create --base main`, and the branch name `changeset-release/main`) — but this repository's actual default/production branch is `master` (confirmed via `git remote show origin`). A branch named `main` does not exist here. This means the release automation described in ADR 0010 — "on merge to main, open a Version Packages PR" — could never actually trigger. `docs/10-deployment.md` and `docs/04-dev-workflow.md` documented the same incorrect assumption. `check-changeset.py` was unaffected, since it already resolves its target branch dynamically from `GITHUB_BASE_REF` rather than hardcoding one.

Playwright's own CI documentation was consulted directly (not assumed from memory) to ground the parallelization approach in current, stated best practice rather than guesswork:

- **Don't cache browser binaries.** Restoring a cache of them takes about as long as a fresh `npx playwright install --with-deps` download — the existing `actions/cache` step for `~/.cache/ms-playwright` was pure overhead.
- **Keep in-job `workers: 1` in CI**, and get parallelism from **sharding the suite across separate jobs/machines** (`--shard=N/M` + a `blob` reporter per shard, merged afterward with `playwright merge-reports`) rather than raising the worker count on one shared runner.

## Decision

**1. Split the monolithic job into a parallel job graph**, all gated by the existing fast `check-changeset` job but otherwise independent of each other:

```
check-changeset
      │
      ├── lint                        (pnpm check)
      ├── typecheck                   (pnpm tsc --noEmit)
      ├── unit-test                   (pnpm test:coverage)
      ├── e2e-test (4-way shard) ──▶  merge-e2e-reports
      ├── build                       (pnpm build)
      └── build-storybook             (pnpm build-storybook)
```

Each job installs its own dependencies via `pnpm install --frozen-lockfile` (fast, since `actions/setup-node`'s `cache: pnpm` caches the store across jobs) — the small duplication cost is worth it in exchange for running on separate runners concurrently. Total wall-clock time becomes roughly the slowest single job instead of the sum of every step.

**2. Shard the E2E suite instead of running it as one job.** `e2e-test` is a 4-way matrix (`playwright test --shard=N/4`), each shard uploading its own `blob` report artifact; a dependent `merge-e2e-reports` job downloads all 4 and runs `playwright merge-reports --reporter html` to produce the single `playwright-report` artifact the team is used to. `playwright.config.ts`'s `reporter` is now `[["blob"], ["github"]]` in CI (was `[["github"], ["html"]]`) and `workers` is back to `1` in CI (was bumped to `2` as an unverified experiment in ADR 0022 PR 10 — sharding across jobs is the correct lever per Playwright's own guidance, not raising in-job worker count on a small shared runner; this supersedes that experiment).

**3. Drop the Playwright browser-binary cache step** — per Playwright's CI docs, restoring it is roughly as slow as a fresh install, so it bought nothing.

**4. Scope Contentful secrets to only the `build` job.** MSW (`tests/mocks/handlers.ts`) intercepts by GraphQL operation name, not URL or credentials, so `lint`, `typecheck`, `unit-test`, and `e2e-test` never needed `CONTENTFUL_*` secrets in the first place — only `next build`'s real static rendering does.

**5. Add `concurrency: { group: ci-${{ github.workflow }}-${{ github.ref }}, cancel-in-progress: true }`** so a new push to the same branch/PR cancels an in-flight run instead of letting a now-superseded run finish and consume runner minutes.

**6. Add `timeout-minutes` to every job** so a hang fails fast instead of running to GitHub's multi-hour default.

**7. Use `pnpm install --frozen-lockfile`** in every job instead of plain `pnpm install`, for reproducibility (fails loudly on an out-of-sync lockfile rather than silently updating it).

**8. Fix the `main` → `master` mismatch.** `release.yml`'s trigger, `manage-release.py`'s three hardcoded references, `ci.yml`'s `pull_request.branches` list, and the branch-name references in `docs/10-deployment.md` / `docs/04-dev-workflow.md` now all say `master`, matching this repository's actual default branch. (The alternative — renaming the GitHub default branch to `main` instead — was considered and explicitly declined in favor of fixing the automation to match the branch that already exists.)

## Consequences

- **Positive:**
  - CI wall-clock time drops from "sum of every step" to "the slowest parallel job" — the E2E job alone was ~48 minutes serially; sharded 4 ways it should be roughly a quarter of that, run alongside (not after) lint/typecheck/unit-test/build/storybook rather than after them.
  - The release automation (Version Packages PR on merge) can now actually trigger — it was previously dead code, since the `main` branch it watched for and pushed to did not exist.
  - Secrets are scoped to the one job that actually needs them (least-privilege, smaller blast radius if a job's logs or artifacts ever leaked).
  - A superseded CI run for outdated commits no longer runs to completion, freeing runner capacity.
- **Negative/Risks:**
  - More total `pnpm install` invocations per run (one per job instead of one per pipeline) — mitigated by pnpm store caching, but not free; if this ever becomes the bottleneck, a future iteration could fan dependencies out from a single cached artifact instead.
  - The E2E report is now split across 4 shard artifacts merged by a separate job — one more moving part than a single `playwright-report/` folder, though the final artifact the team downloads is unchanged.
  - `ubuntu-latest` runners are typically 2-core; 4-way sharding assumes GitHub schedules the 4 shard jobs with real concurrency rather than serializing them due to account-level concurrent-job limits. Worth confirming against the next few real CI runs rather than assumed correct from local reasoning alone — the same lesson ADR 0022 PR 11 already drew about local-vs-CI parity applies here too.
