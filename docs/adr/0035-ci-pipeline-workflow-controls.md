# 35. CI Pipeline Workflow Controls via Repository Variables

Date: 2026-09-14

## Status

Accepted

## Context

Our Continuous Integration (CI) pipeline leverages GitHub Actions for rigorous checks, including Typechecking, Linting, Unit Tests, and 4-shard parallel Playwright E2E testing. 

However, running the full suite (especially the E2E matrix) consumes a significant amount of GitHub Actions runner minutes per push. If the monthly quota is exhausted, all pipelines fail instantly, blocking development. During periods of heavy iteration, we need the ability to temporarily pause expensive pipeline stages without merging code changes to `ci.yml` every time.

## Decision

We introduced **Workflow Controls** — GitHub repository variables (`ENABLE_CI`, `ENABLE_CHANGESET`, `ENABLE_E2E`) that act as feature flags for the CI infrastructure.

These variables are evaluated at the `job.if` level. When set to `"false"`, the corresponding jobs are skipped entirely, consuming zero runner minutes.
- `ENABLE_CI`: Master kill switch for the entire workflow.
- `ENABLE_CHANGESET`: Skips the changeset enforcement check while allowing the rest of the pipeline to proceed (downstream jobs explicitly tolerate a `skipped` result).
- `ENABLE_E2E`: Skips the 4 Playwright shards and the report merger.

The default state (when variables are absent) is `enabled`, ensuring that a fresh fork gets a robust, fully-functioning CI pipeline out of the box.

## Consequences

- **Cost Savings**: Repository admins can instantly disable E2E testing (the most expensive stage) during rapid iteration sprints to save GitHub Actions minutes.
- **Flexibility**: CI stages can be toggled without polluting the commit history with `skip e2e` commits.
- **Safety**: Since the default is "enabled", developers cannot accidentally break the CI for everyone else by forgetting to set a variable.
