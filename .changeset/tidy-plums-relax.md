---
"abbas-web-resume": patch
---

Fixed two real bugs found while auditing the CI/CD surface for ADR 0023:

- `.husky/pre-commit` ran `ultracite fix` under `set -e` as a plain statement, so a non-zero exit (unfixable lint issues) aborted the script before it ever reached the exit-code capture and custom error message — dead code, confirmed by reproduction. Moved the call into an `if`/`else` (exempt from `set -e`) so the message and exit code are now reachable. Also scoped the fix to staged files only, via `ultracite fix`'s `[files...]` argument, instead of reformatting the entire repo on every commit.
- `scripts/ci/manage-release.py` would have failed on the second release cycle: `git checkout {branch_name}` for the existing `changeset-release/master` branch had no prior `git fetch`, and `actions/checkout@v4` never fetches branches other than the one that triggered the workflow. Added the fetch and switched to an idempotent `git checkout -B {branch_name} origin/{branch_name}`.
