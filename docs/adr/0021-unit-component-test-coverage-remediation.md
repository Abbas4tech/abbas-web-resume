---
title: 0021 - Unit & Component Test Coverage Remediation Plan
date: 2026-09-07
status: accepted
---

# 0021 - Unit & Component Test Coverage Remediation Plan

## Status

Accepted and **implemented**. All open questions raised alongside this ADR were resolved by the repo owner (see
**Decision §2, §3**), and the full §1 backlog (P0/P1/P2) has landed across three PRs on this branch — see
**Implementation** below for what shipped and the final numbers. The companion E2E plan
([0022](./0022-e2e-journey-and-fixture-expansion.md)) is unaffected and still pending.

> **Branch note:** this ADR was originally drafted while this branch was cut from an older `develop-draft` tip,
> before PR #35 (`feat/develop-draft/page-description-richtext-field`) merged into `develop-draft`. This branch
> has since picked up that merge. The findings and numbers below were re-verified against the current tree
> after that merge landed, so they reflect what's actually on this branch today, not the pre-merge snapshot.

## Context

ADR [0005](./0005-vitest-component-testing-strategy.md) established the Vitest + jsdom + colocated-`.spec.tsx`
strategy. That strategy is sound and already followed for most Element/Pattern/Block UI components. What it
did not anticipate is *how unevenly it would end up applied* as the codebase grew past its first components.

Running `pnpm test:coverage` on this branch today (2026-09-07, 84 spec files, 167 tests, all passing) reports:

```
Statements   : 21.56% ( 553/2564 )
Branches     : 33.40% ( 334/1000 )
Functions    : 44.58% ( 181/406 )
Lines        : 21.52% ( 546/2536 )
```

That figure is misleading on its own — a meaningful slice of the denominator is
`src/contentful/generated/*` (auto-generated GraphQL SDK, ~6,100 lines, 0% and untestable by nature) and
`src/contentful/scripts/*` (six one-off Contentful migration/setup scripts, ~2,500 lines combined, 0%, dev
tooling rather than app runtime code — see Decision §2). Excluding both from the denominator, the real picture
is closer to **40-45% of shipped application code**, and the gaps are not noise — they cluster in exactly the
places a coverage audit should worry about:

### Finding 1 — Two spec files were silently never run (fixed as part of this session)

`not-found.test.tsx` and `server-error.test.tsx` used the `.test.tsx` suffix instead of the `.spec.tsx`
convention ADR 0005 §5 mandates. `vitest.config.ts`'s `include: ["src/**/*.spec.{ts,tsx}"]` never matched them,
so both blocks silently reported 0% coverage despite having tests written for them. This was a pure naming bug,
not a scope gap — see **Decision §0** (already applied on this branch).

### Finding 2 — The core Contentful adapters are almost entirely untested

`src/contentful/adapters/` is the single most consequential directory in the codebase: every file in it is a
pure function (`(GraphQL fragment) → domain shape`), per ADR 0005 §5's own colocation rule, and a bug here
silently mis-renders or blanks out real CMS content in production with no compiler error to catch it. Only 2 of
13 files in this directory have their own spec:

| Adapter | Coverage | Has its own spec? |
|---|---|---|
| `page-metadata.ts` | 100% | ✅ |
| `seo-metadata.ts` | 80% | ✅ |
| `nav-mapper.ts` | 100% (incidental) | ❌ |
| `image.ts` | 50% (incidental) | ❌ |
| `content-item.ts` | 0% | ❌ |
| `content-list.ts` | 0% | ❌ |
| `content-section.ts` | 0% | ❌ |
| `icon.ts` | 0% | ❌ |
| `layout.ts` | 0% | ❌ |
| `link.ts` | 0% | ❌ |
| `page.ts` | 0% | ❌ |
| `stat-item.ts` | 0% | ❌ |

`layout.ts` and `page.ts` in particular back *every single page render* (they adapt the `GetLayout` and
`GetPageByPath` responses consumed by `src/app/(app)/[[...slug]]/page.tsx`) and have no test guarding their
null-handling, missing-field, or malformed-collection branches.

### Finding 3 — The block-type registries are only spot-checked, not exhaustively tested

`ContentSection` and `ContentList` (`src/components/contentful/page-section/`) are declarative lookup-table
renderers — the mechanism ADR [0004](./0004-contentful-renderers.md) relies on to let Contentful's `ui` field
pick which Block mounts. Coverage shows `content-list.tsx` at 66% statements / 40% functions: only some of its
four registry branches (`TimelineSection`, `SplitContentPanel`, `CardGrid`, `PanelShowcase`) are exercised by
the existing spec, and the "unknown `ui` value → `BlockPlaceholder` fallback" path is untested for at least one
of the two registries. A future fifth block type added to either registry has no test scaffold pushing the
author to cover it.

### Finding 4 — `rich-text.tsx` is under-tested relative to its blast radius

`patterns/rich-text/rich-text.tsx` is at 38% statements / 27% functions. This component renders **every**
Contentful Rich Text field in the app (hero banner bio, split-content-panel body, timeline entry body, the page
description field) by mapping each `@contentful/rich-text-types` node type to a DaisyUI element. Untested
node-type branches (the coverage report points at lines 49-52, 62, 68-100) mean a malformed or unusual rich-text
document authored in Contentful (e.g., a nested list, an embedded asset/entry, a blockquote, an `hr`) has no
regression guard — the first time a gap in this mapping is discovered would be a live rendering bug, not a
failing test.

### Finding 5 — Motion/behavioral elements and theme-toggle branch logic are weakly covered

- `motion-provider.tsx` (0%) and `frozen-router.tsx` (0%) have no tests at all.
- `theme-toggle.tsx` is 52% statements / 14% branches — the theme-list-driven dropdown logic (reading
  `themeList`/`defaultTheme` off the CMS `Layout` and switching DaisyUI's `data-theme`) is mostly untested.
- `drawer.tsx` is 88% statements but only 54% branches — some open/close/variant state combinations are
  unexercised.

### Finding 6 — No coverage floor is enforced

`vitest.config.ts` has no `coverage.thresholds` block. CI (`ci.yml`) runs `pnpm test:coverage` and uploads the
report as an artifact, but nothing fails the build if coverage regresses. Coverage can currently silently drop
on any PR.

## Decision

### §0 — Applied immediately (approved by repo owner as a pre-work exception)

Renamed the two mis-suffixed files (`not-found.test.tsx` → `not-found.spec.tsx`,
`server-error.test.tsx` → `server-error.spec.tsx`). No other code was touched. `pnpm vitest run` reports 84
passed spec files / 167 passed tests on this branch.

### §1 — Priority order for the remaining work

1. **P0 — Contentful adapters** (`content-item`, `content-list`, `content-section`, `icon`, `image`, `layout`,
   `link`, `page`, `stat-item`). Pure functions, cheapest to test, highest blast radius. Each spec should cover:
   the happy path, `null`/`undefined` input, an empty nested collection, and (where relevant) an unrecognized
   `__typename`/`ui` discriminant.
2. **P1 — Registry exhaustiveness** for `content-section.tsx` and `content-list.tsx`: one test per registered
   `ui` branch plus the `BlockPlaceholder` fallback branch, asserting the correct Block component and adapter
   are invoked for each.
3. **P1 — `rich-text.tsx` node-type matrix**: one assertion per supported `@contentful/rich-text-types` node
   (paragraph, heading 1-6, unordered/ordered list + list item, blockquote, hr, hyperlink, bold/italic/
   underline/code marks, embedded asset, embedded entry) plus one "unknown node type" fallback case.
4. **P2 — Motion/behavioral elements & theme-toggle branches**: `motion-provider.tsx` (renders children,
   provides the `LazyMotion` context), `frozen-router.tsx` (freeze/unfreeze behavior around navigation),
   `theme-toggle.tsx` (theme list rendering, selecting a theme, persisting/reading the active theme),
   remaining `drawer.tsx` branch combinations.
5. **P2 — `contentful/lib/client.ts`**: currently 0%; thin GraphQL client factory. Lower priority — mostly
   config wiring — but a single test confirming the correct endpoint/token/environment resolution is cheap
   insurance against a misconfigured request silently hitting the wrong Contentful environment.

### §2 — Explicitly out of scope (decided)

- `src/contentful/generated/*` — auto-generated GraphQL SDK types/client. Excluded from coverage targets
  entirely; regenerating and asserting on generated code has no value.
- `src/contentful/scripts/*` (`setup-content-model.ts`, `audit-environment-content.ts`,
  `extract-legacy-content.ts`, `migrate-favicon-to-seo.ts`, `migrate-legacy-content.ts`,
  `migrate-missing-content.ts`) — one-off/administrative CLI tooling run manually against Contentful, not part
  of the deployed app's runtime path. **Decision: excluded from the coverage percentage target** (add to
  `vitest.config.ts`'s `coverage.exclude` as part of implementation). No smoke tests requested for their
  internal mapping helpers either — this directory stays entirely outside the unit-test surface for now.

### §3 — Coverage floor (decided)

Once the P0/P1 backlog above lands, add a `coverage.thresholds` block to `vitest.config.ts`: **75% statements
and lines, 65% branches**, measured on the *application* subset (i.e., after the `generated`/`scripts`
exclusions in §2), ratcheted up over time, so CI fails on regression instead of only reporting it.

## Implementation

Landed as three PRs on `feat/develop-draft/test-coverage-expansion-plan`, in the order proposed in §1:

1. **Contentful adapter tests** (`content-item`, `content-list`, `content-section`, `icon`, `image`, `layout`,
   `link`, `page`, `stat-item` — 9 new spec files, following the inline-typed-fixture convention already
   established by `page-metadata.spec.ts`/`seo-metadata.spec.ts` rather than the `tests/mocks/factories.ts`
   pattern anticipated in **Consequences** below). Adapters directory: 3.84% → **96.73%** statements.
2. **Registry exhaustiveness + rich-text node types**: added the three missing `ContentList` dispatch tests
   (`TimelineSection`, `SplitContentPanel`, `PanelShowcase`) and a full node-type/mark matrix for `RichText`
   (all six heading levels, the function-form `headingClass` prop, ordered/unordered lists, blockquotes, tables,
   bold/italic/underline/code). Both `content-list.tsx`/`content-section.tsx` and `rich-text.tsx` reached
   **100%** statements/branches.
3. **Motion/behavioral elements, remaining branches, and the coverage floor**: added specs for
   `motion-provider.tsx` and `frozen-router.tsx` (previously untested), closed `theme-toggle.tsx`'s branch gaps
   (dock-on-mobile variant, view-transition support, active-theme highlighting) and `drawer.tsx`'s (right-side
   layout, the `useDrawer`-outside-provider guard, the mobile-collapsed initial state — isolated in its own
   `drawer.mobile.spec.tsx` file since mocking `useMobile` there would otherwise affect every other test in the
   module), and added `contentful/lib/client.spec.ts` for the GraphQL endpoint/token resolution. Implemented §2
   (excluded `generated`/`scripts` from `vitest.config.ts`'s `coverage.exclude`) and §3 (added the
   `coverage.thresholds` block) — verified achievable *before* enabling it: application code measured 91.71%
   statements / 82.36% branches against the 75%/65% floor, so it started as a comfortable regression guard, not
   a gate that would immediately fail CI.

**Final state**: 84 → 97 spec files, 167 → 274 tests, all passing; lint and typecheck clean. `frozen-router.tsx`
has one deliberately-unclosed gap — its `typeof window === "undefined"` SSR branch can't be exercised in jsdom
without deleting the global `window`, which risked destabilizing the rest of the jsdom-based suite for a single
branch of a purely defensive check.

## Considered Options

- **Rewrite `vitest.config.ts`'s `include` to also catch `*.test.tsx`, instead of renaming the two files.**
  Rejected: it would leave the codebase with two competing naming conventions and contradict ADR 0005 §5,
  which the rest of the codebase (the other 82 spec files) already follows correctly.
- **Test the generated GraphQL SDK and the migration scripts to hit a single blanket coverage number.**
  Rejected: it inflates the denominator with code that either can't meaningfully fail in a way a unit test
  would catch (generated types) or isn't part of the runtime path the site's visitors exercise (one-off
  migration tooling). Confirmed by the repo owner (Decision §2) — no smoke tests requested for the scripts
  either.

## Consequences

### Positive
- Once implemented, the highest-risk code in the app — the CMS-to-render pipeline — gets the regression
  coverage the rest of the component layer already enjoys.
- A future Contentful schema change or a new rich-text node type authored in the CMS has a test that fails
  loudly in CI instead of a silent rendering gap discovered by a site visitor.
- Restores the accuracy of the coverage number itself (Finding 1) so it can be trusted going forward.

### Negative / Trade-offs
- Excluding `contentful/scripts/*` from coverage (§2) means a real bug in one of the migration scripts would
  still only be caught by manually running it against a real (or sandboxed) Contentful environment, not by CI.
- *(Anticipated, did not materialize)* This section originally predicted P0 adapter tests would require
  expanding `tests/mocks/factories.ts`. In implementation, each adapter spec built its fixtures inline instead
  (matching the pre-existing `page-metadata.spec.ts`/`seo-metadata.spec.ts` convention), so `factories.ts`
  remains untouched and is still available, unclaimed, for the E2E fixture work in ADR 0022.
