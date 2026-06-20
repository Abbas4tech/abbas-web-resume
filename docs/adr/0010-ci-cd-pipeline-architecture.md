# 10. CI/CD Pipeline Architecture

Date: 2026-06-18

## Status

Accepted

## Context

We need a production-grade CI/CD pipeline to ensure code quality, test integrity, and predictable releases. The project currently leverages a modern stack consisting of Next.js, Vercel (for hosting), Ultracite (linting/formatting), TypeScript, Vitest (component testing), Playwright (E2E testing), Storybook, and Changesets (versioning).

Additionally, the `github-workflow-automation` skill has been introduced, offering AI-powered swarm capabilities for CI orchestration. We needed to decide how to balance native GitHub Actions, third-party integrations, and Vercel's native deployment capabilities.

## Decision

We have decided on the following CI/CD architecture:

1. **Deployment (CD): Native Vercel**
   *   *Decision:* We will rely on Vercel's native GitHub integration for auto-deployments.
   *   *Rationale:* Vercel's native integration provides out-of-the-box preview environments without requiring complex GitHub Action orchestration.

2. **PR Validation (CI): Python Orchestrated Changeset Gate**
   *   *Decision:* We will use a custom Python script (`scripts/ci/check-changeset.py`) that runs before any other CI steps. It checks `git diff` to ensure a `.changeset/*.md` file is present. If missing, the pipeline fails immediately. If present, it proceeds to run Ultracite, tsc, Vitest, Playwright, and Storybook checks.
   *   *Rationale:* Enforcing changesets via a fast Python script ensures we never merge a PR without a changelog entry, saving time and compute resources by failing early.

3. **Release Management: Python Automation**
   *   *Decision:* We will use a custom Python script (`scripts/ci/manage-release.py`) that triggers on merge to `main`. It will run `changeset version`, detect if files were consumed, and use the GitHub CLI (`gh`) to open a "Version Packages" PR.
   *   *Rationale:* Using Python gives us maximum, fine-grained control over the release mechanics, allowing us to build custom logic beyond what the standard `changesets/action` provides, and removing reliance on black-box Actions or Swarm agents.

## Consequences

*   **Positive:** 
    *   Maximum control over CI behavior via Python.
    *   Fails early if PRs are missing changesets.
*   **Negative/Risks:** 
    *   Increased maintenance burden for the custom Python scripts compared to using off-the-shelf GitHub Actions.
    *   Requires ensuring the GitHub Actions runner has Python and `gh` CLI properly configured.
