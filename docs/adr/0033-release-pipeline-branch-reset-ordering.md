---
status: accepted
date: 2026-09-11
---

# 33. Release Pipeline Branch-Reset Ordering Bug

## Context

`release.yml` runs `scripts/ci/manage-release.py` on every push to `master`. Its job: run
`pnpm changeset version` (consuming pending `.changeset/*.md` files into a version bump +
CHANGELOG update), commit that onto a `changeset-release/master` branch, and open/update a
"Version Packages" PR. This started failing deterministically:

```
Running: git add .
Running: git commit -m "chore(release): version packages"
Command failed with exit code 1
STDOUT: nothing to commit, working tree clean
STDERR: No staged files to format
```

The script ran the steps in this order: `pnpm changeset version` (producing uncommitted
version-bump/CHANGELOG changes against whatever was currently checked out — `master`, since
that's what triggered the workflow) → check `git status --porcelain` for those changes →
*then*, only if `changeset-release/master` already existed remotely (true after every release
whose PR hadn't been merged yet), `git checkout -B changeset-release/master
origin/changeset-release/master` followed by `git reset --hard master`.

That reset ran **after** `changeset version` had already produced its uncommitted output — and
`git reset --hard` unconditionally discards uncommitted working-tree changes, regardless of
when they were made. It wiped the version-bump work before `git add .` ever saw it. This wasn't
intermittent: it failed on every release after the very first one (the only case where
`changeset-release/master` doesn't already exist and the buggy reset branch never runs) that
also had new changesets pending. The repo owner's separate observation — the branch "gets ahead
or behind master" — was the same root cause: without ever cleanly rebasing the branch on
`master` before adding new work, whatever the branch's history looked like from a prior cycle
just accumulated.

## Decision

Reordered `manage-release.py` so the branch is positioned first, `changeset version` runs
second:

1. Resolve `changeset-release/master`'s position — fetch and hard-reset it onto `master`'s
   current commit if it already exists remotely, or branch fresh from the current checkout if
   it doesn't. Either way, the working tree is now clean and exactly matches `master`.
2. *Then* run `pnpm changeset version` against that clean base.
3. Check `git status --porcelain` for its output, `git add .` + commit only if there's
   something to commit.

This makes `git reset --hard master` do only what it was actually meant to do — reset the
*branch pointer and history* to match `master` — without also being in a position to discard
work that hadn't been committed yet. As a side effect, the branch can no longer accumulate
drift across releases: every run rebuilds it as exactly `master` plus one fresh version-bump
commit, never carrying forward whatever state a prior cycle left it in.

## Considered Options

- **Commit immediately after `changeset version`, before any branch positioning, then
  cherry-pick or rebase that commit onto the reset branch.** Rejected — meaningfully more
  complex (a commit-then-move dance) for the same end state a plain reordering already achieves
  with no extra git operations.
- **Stash the `changeset version` output before the reset, then pop it after.** Rejected for
  the same reason — `git stash`/`pop` adds a second failure mode (a stash pop conflict) that
  reordering avoids entirely by never creating uncommitted changes before the destructive reset
  in the first place.

## Consequences

### Positive
- The release pipeline can now actually complete a release when a prior Version Packages PR is
  still open — previously guaranteed to fail in exactly that (common) situation.
- The `changeset-release/master` branch is self-healing every run instead of accumulating
  drift — no manual branch deletion or force-push ever needed to recover it.

### Negative / Trade-offs
- None identified — the reordering is behavior-preserving for the one case that already worked
  (branch doesn't exist yet) and only changes behavior for the case that was previously broken.

## Verification

Reproduced the exact failure in an isolated sandbox git repository (no real remote): simulated
`changeset version`'s uncommitted output, ran the old order, confirmed the change was silently
discarded and `git status --porcelain` came back empty — reproducing "nothing to commit,
working tree clean" precisely. Re-ran with the fixed order and confirmed the same simulated
change survived through to a successful commit. Not just reasoned about — actually reproduced
and re-verified against real git behavior before shipping.
