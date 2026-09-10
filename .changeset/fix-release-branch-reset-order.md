---
"abbas-web-resume": patch
---

Fixed a deterministic bug in the release pipeline (`scripts/ci/manage-release.py`) that failed every release after the first one that had an unmerged prior "Version Packages" PR still open. The script ran `pnpm changeset version` (producing uncommitted version-bump/CHANGELOG changes) *before* resetting the `changeset-release/master` branch to match `master`, and that reset used `git reset --hard`, which unconditionally discards uncommitted changes — wiping out the version-bump work before it could be committed, and failing with "nothing to commit, working tree clean". Reordered so the branch is reset to match `master` first, then `changeset version` runs on that clean base — this also means the branch can no longer accumulate drift across releases, since it's always rebuilt as exactly "master + one version-bump commit" each run.
