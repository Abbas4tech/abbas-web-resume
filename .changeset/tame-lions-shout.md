---
"abbas-web-resume": patch
---

Restructured CI (`.github/workflows/ci.yml`) from one sequential job into a parallel job graph (lint, typecheck, unit-test, a 4-way sharded e2e-test + merge, build, build-storybook), matching Playwright's own CI guidance: no Playwright browser-binary cache (restoring one is as slow as a fresh install), sharding across jobs instead of raising in-job worker count, and a `blob` reporter merged after all shards finish. Contentful secrets are now scoped only to the `build` job, since every other job runs against MSW's mocked fixture site regardless of them. Added a `concurrency` group so superseded runs on the same branch/PR are cancelled instead of running to completion, and `timeout-minutes` on every job.

Also fixed a real, unrelated defect found while reading the pipeline: `release.yml` and `scripts/ci/manage-release.py` hardcoded a branch named `main`, which does not exist in this repository (the actual default/production branch is `master`) — meaning the "Version Packages" release automation described in ADR 0010 could never trigger. Both now target `master`, matching `ci.yml`'s `pull_request` trigger and the docs.

See [ADR 0023](../docs/adr/0023-ci-pipeline-parallelization.md) for the full rationale.
