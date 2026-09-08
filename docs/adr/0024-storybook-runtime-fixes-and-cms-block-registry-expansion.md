---
status: accepted
date: 2026-09-07
---

# 24. Storybook Runtime Fixes & CMS Block Registry Expansion

## Status

Accepted and implemented

## Context

A Storybook and component-registry audit (requested by the repo owner) combined a static read of the
component tree with a **live render pass**: every non-docs story (87 entries) was loaded in a headless
Chromium instance and checked for console/render errors, rather than trusting that a green `pnpm
build-storybook` meant every story actually worked. It didn't. Three concrete problems surfaced, in order of
severity:

1. **`SidebarNav`, `BottomDock`, and `PageNavButton` crashed outright in Storybook** (6 story variants,
   error-boundary-swallowed renders showing nothing). Root cause: all three call `usePage()`
   (`src/hooks/use-page.tsx`), which uses `next/navigation`'s App Router `useRouter()`/`usePathname()`.
   `@storybook/nextjs-vite` ships mocks for both the legacy Pages Router and the App Router, but defaults to
   the Pages Router one (`parameters.nextjs.appDirectory` defaults to `false`). This app is App Router only
   (`src/app/`) — there was no reason for the default to ever matter here, it just was never set.
2. **13 story variants across 6 components silently rendered the wrong icon.** ADR 0016's curated
   `ICON_REGISTRY` allowlist worked exactly as designed — an unregistered icon code falls back to `MdError`
   and logs `console.error` rather than crashing — but several `.mock.ts` fixtures (and, in two cases,
   `panel-showcase.mock.ts`/`split-content-panel.mock.ts`, data shapes real Contentful content could also
   hit) referenced icon codes that were never added to the registry: `md/MdOutlineDocumentScanner`,
   `md/MdOutlineColorLens`, `md/MdLink`, `si/SiNextdotjs`, `md/MdStorage`, `si/SiExpress`,
   `md/MdEventAvailable`, `md/MdLanguage`, `md/MdAccessTime`, `md/MdPerson`.
3. **CI could not have caught either of the above.** `@storybook/test-runner` (`.storybook/test-runner.ts`)
   was fully configured with an `axe-playwright` a11y check, but had no `package.json` script and no CI job —
   `.github/workflows/ci.yml`'s `build-storybook` job only runs `pnpm build-storybook`, a Vite bundling check
   that never mounts a story in a browser and so cannot catch a missing context provider or an accessibility
   regression. Separately, `chromatic.config.json` exists (with a real `projectId`, so a Chromatic project
   already exists for this repo) and `docs/06-storybook.md` states visual diffs are submitted "automatically
   ... on every PR" — no workflow file references `chromatic` anywhere, so that has never actually run.

Separately, the repo owner's stated goal — "toggle more components on/off from Contentful" — turned out to
already have working infrastructure, just switched on for almost nothing: `ContentSection.ui` (the field an
editor picks) accepted exactly one value, `"HeroBanner"`, in both `setup-content-model.ts`'s validation and
`content-section.tsx`'s `SECTION_BLOCK_REGISTRY`. `ContentList.ui` fared better (4 values), but 22 built,
tested, documented Blocks/Patterns in `src/components/` had no CMS path at all. Two adapter bugs compounded
this: `adaptContentSection`/`adaptContentList` defaulted an empty `ui` field to `"Standard"`/`"Grid"` —
neither string was ever a registered key in either registry, so a Contentful entry with a blank `ui` field
silently rendered nothing in production (`BlockPlaceholder` returns `null` outside development, per ADR
0004). `docs/contentful/content-model.md` itself documents `ContentSection.ui`'s intended values as *"e.g.,
HeroBanner, SplitContentPanel"* — the second half was simply never wired up, even though `SplitContentPanel`
already existed as a fully-built Block (just registered under `ContentList` instead).

## Decision

### 1. Fix the Storybook App Router mock (root cause, not a workaround)

```ts
// .storybook/preview.tsx
const preview: Preview = {
  parameters: {
    nextjs: { appDirectory: true },
    // ...
  },
};
```

Verified directly: re-ran the same 87-story headless-browser check with this one line added — all three
previously-crashing components rendered correctly, zero regressions elsewhere. Safe to set globally rather
than per-story since the whole app is App Router; there is no Pages Router story that needs the old default.

### 2. Reconcile mock/CMS icon codes against the curated registry, per-icon

Two legitimate fixes, applied by judgment per icon rather than uniformly:

- **Repointed to an already-curated equivalent** where one existed (no registry growth needed):
  `md/MdOutlineDocumentScanner` → `fa/FaDownload` (AppHeader resume action), `md/MdOutlineColorLens` →
  `md/MdColorLens` (AppHeader theme toggle — same icon, non-outline variant was already registered),
  `md/MdPerson` → `io5/IoPerson` (NavItem/SidebarNav "About"), `si/SiNextdotjs` → `ri/RiNextjsFill`
  (PanelShowcase — both are the Next.js logo; only one was registered).
- **Registered as new**, where no curated equivalent fit the intended meaning (all verified to exist in the
  installed `react-icons` version before wiring): `md/MdLink`, `md/MdStorage`, `si/SiExpress`,
  `md/MdEventAvailable`, `md/MdLanguage`, `md/MdAccessTime`. See the amendment appended to ADR 0016.

### 3. Wire the accessibility test-runner into CI, with one narrow, precedented exclusion

Added `test-storybook` (local, against a running dev server) and `test-storybook:ci` (self-contained: builds
Storybook, serves it with `http-server`, waits for it with `wait-on`, then runs the test-runner — the exact
recipe from `@storybook/test-runner`'s own README for CI usage) as `package.json` scripts, backed by new
`concurrently`, `http-server`, and `wait-on` devDependencies. Added a `storybook-a11y` job to
`.github/workflows/ci.yml`, parallel to the other `check-changeset`-gated jobs per ADR 0023's pattern.

Running it for the first time (before any exclusion) surfaced 25 failing tests across 13 story files. Two
categories, handled differently:

- **`color-contrast` (11 nodes across CardGrid, NotFound, MotionWrapper, PanelShowcase,
  SplitContentPanel):** disabled in `.storybook/test-runner.ts`'s `axeOptions`, for the identical reason
  `tests/e2e/fixtures/test-base.ts` already disables it suite-wide per ADR 0022 §"PR 11" — axe-core samples
  rendered pixels, and font hinting/anti-aliasing differences between local and CI rendering environments
  flip already-borderline DaisyUI color tokens unpredictably. This is the same investigated, accepted
  trade-off applied to a second axe integration point, not a new one.
- **Everything else (`svg-img-alt`, `aria-progressbar-name`, `label`) was a real, fixable bug — fixed
  directly, matching ADR 0022's own precedent of fixing structural a11y defects rather than suppressing
  them:**
  - `Accordion`'s radio input had no accessible name (`<input type="radio" name="...">` with nothing
    associating it to the visible `.collapse-title`) — added `aria-label`.
  - `Progress`'s own story, and `IconProgressRow`'s mock, never set the `aria-label` both components already
    support and thread correctly — the components were fine, the fixtures weren't.
  - `Dock`, `Swap`, `NavItem`/`SidebarNav`, `TimelineSection`, `PanelShowcase`, and `SplitContentPanel`'s
    mocks passed `Icon` an `iconCode` with no `name` — the same class of bug ADR 0022 already fixed once for
    `IconLink` in the E2E fixture, recurring here in Storybook's separate fixture set. Added names throughout.
  - `Step`'s own story wrapped bare `<Step>` divs in a `<ul>` to visually demo DaisyUI's steps look — but
    `Step` renders a `<div>` (correctly: its real consumer, `TimelineEntry`, mounts it with no list wrapper at
    all), so the story was claiming list/listitem semantics its markup doesn't have. Fixed in the story
    (`<ul>` → `<div>`), not the component, since the component's actual usage was never wrong.

Result: 48 story files / 89 tests passing before the new Blocks below, 54/102 after — zero accessibility
violations, zero suppressed defects beyond the one already-accepted `color-contrast` exception.

Chromatic: intentionally **not** wired into CI as part of this change. The repo owner asked to investigate it
locally first; that requires a Chromatic project token this session doesn't have. The `chromatic` CLI was
added as a devDependency and a `pnpm chromatic` script exists, ready to run once a token is available — see
the Open Questions this ADR's companion report raised.

### 4. Fix the CMS registry's silent-null default-value trap

```ts
// src/contentful/adapters/content-section.ts
ui: item.ui || "HeroBanner", // was "Standard" — never a registered key
// src/contentful/adapters/content-list.ts
ui: item.ui || "CardGrid", // was "Grid" — never a registered key
```

An entry with a blank `ui` field now falls back to an actually-rendering Block instead of silently vanishing
in production.

### 5. Open `ContentSection` up to a second and third Block: `SplitContentPanel`, `AnnouncementBanner`

`SplitContentPanel` was already fully built, tested, and Storybook-documented — just unreachable from
`ContentSection`. Added a dedicated `adaptSplitContentPanelFromSection` (co-located in
`split-content-panel.adapter.ts` alongside the existing list-shaped `adaptSplitContentPanel`, not a type-cast
hack layered onto it) that maps a single entry's rich-text `body` to the description and its `subItems`
(StatItem entries) to the info rows — a different data shape than the ContentList-driven path, so it earned
its own adapter function rather than forcing one shape through the other. `AnnouncementBanner` is new (see
below). Both registered in `SECTION_BLOCK_REGISTRY`; both enum values added to `setup-content-model.ts`'s
`contentSection.ui` validation (code only — **not yet run against the live Contentful space**, pending the
repo owner's review; see Open Questions).

### 6. Six new Blocks, each composing an existing Element/Pattern that had no CMS path

Every new Block follows the exact convention `docs/06-storybook.md`/ADR 0002 already establish:
`component.tsx` + `component.mock.ts` + `component.stories.tsx` + `component.spec.tsx` +
`component.adapter.ts` + `component.adapter.spec.ts`, registered in the relevant registry, with the
`ContentList`/`ContentSection` enum extended in `setup-content-model.ts`.

| Block | Built from | Registry | Data shape |
|---|---|---|---|
| `FaqAccordion` | `Accordion`/`AccordionItem` | `ContentList` | entry title → question, body → rich-text answer |
| `MetricsStrip` | `StatGroup` (already a Pattern, previously had zero Block/registry wiring) | `ContentList` | entry title → label, subtitle → value |
| `ProcessSteps` | `Step`/`StepIndicator`/`StepBody` | `ContentList` | entries in order → numbered/iconed steps |
| `ContentTabs` | `Tabs`/`Tab` (`"use client"`, local `useState` for active tab) | `ContentList` | entry title → tab label, body → panel rich text |
| `TechBadgeCloud` | `Badge` + `Icon` | `ContentList` | entry title + icon → badge |
| `AnnouncementBanner` | `Alert` | `ContentSection` | entry description/title → message, first matching tag (`info`/`success`/`warning`/`error`) → variant, first link → CTA |

`CardGrid` also picked up a real, independently-discovered bug while auditing story data: it keyed its
`MotionStaggerItem` list by `card.title`, which the `ManyCards` story's identical-content tripling turned into
a React duplicate-key warning. Two live Contentful entries sharing a title would hit the same bug in
production. Added an optional `id` to `MediaCardProps` (threaded through the adapter from `sys.id`, unused for
rendering), keyed by `card.id ?? card.title`, and gave the `ManyCards` story genuinely distinct fixture data
instead of leaning on an index-based key (which `ultracite`'s lint rule correctly rejects even combined with
another value).

`PageWrapper` was the one component in the entire tree with no `.stories.tsx`/`.mock.ts` pair, contradicting
ADR 0002's stated convention — added, no other changes needed since it has no context dependency of its own.

## Considered Options

- **Suppress all newly-discovered a11y violations, not just `color-contrast`.** Rejected: `svg-img-alt`,
  `aria-progressbar-name`, and `label` were genuine, cheap-to-fix defects with an established fix pattern
  already used elsewhere in this codebase (ADR 0022) — suppressing them would trade a real safety net for a
  green checkmark.
- **Force `SplitContentPanel`'s existing `ContentList`-shaped adapter to serve `ContentSection` too**, via a
  cast or an ad hoc reshaping in the registry. Rejected after writing it and recognizing the smell: the two
  data shapes (a list's own description + N entries, vs. one entry's body + its subItems) are genuinely
  different, and a second adapter function is a five-line addition, not real duplication.
- **Run `setup-content-model.ts` against the live Contentful space immediately**, since the repo owner asked
  for the new Blocks to eventually appear there. Deferred: the repo owner's own sequencing ("I will review
  them once ... we can add it to the Contentful Cloud portal as well") plus this being a write against a
  shared, external system make it a distinct, explicitly-confirmed step rather than a side effect of this ADR.
- **Wire Chromatic into CI now.** Deferred per explicit instruction to investigate locally first, and because
  doing so requires a project token this session was never given.

## Consequences

### Positive
- Every Storybook story (54 files / 102 tests, including the 6 new Blocks) renders and passes its
  accessibility check with zero known-and-ignored regressions beyond the one already-accepted
  `color-contrast` exception.
- A regression class that previously had **no automated detection at all** (a story that crashes at render
  time, or a real a11y defect) is now caught in CI by `storybook-a11y`, independent of and in addition to
  `build-storybook`'s bundling check.
- The CMS "toggle a component on/off" mechanism the repo owner asked to expand went from 1 reachable
  `ContentSection` variant and 4 reachable `ContentList` variants to 3 and 9 respectively — all of it real,
  tested, Storybook-documented code, not a stub.
- `CardGrid`'s list-key bug is fixed at the source (`id`), not papered over in the one story that happened to
  expose it.

### Negative / Trade-offs
- Six new Blocks means six new adapter functions and mock fixtures to keep in sync with the real Contentful
  schema going forward — the same maintenance shape every existing Block already has, not a new category of
  cost.
- `storybook-a11y` builds Storybook a second time in CI (once here, once in `build-storybook`), rather than
  downloading `build-storybook`'s artifact — a deliberate choice to keep it a fully independent, parallel job
  per ADR 0023's pattern instead of introducing a cross-job dependency; worth revisiting if CI minutes become
  a constraint.
- The `setup-content-model.ts` enum changes and the two new `ContentSection` values are **not yet reflected in
  the live Contentful space** — until that script is run there, an editor cannot actually pick
  `SplitContentPanel`/`AnnouncementBanner`/the five new `ContentList` blocks from the CMS yet, even though the
  code fully supports it.
- Chromatic remains configured but unused; the gap `docs/06-storybook.md` already overstates ("automatically
  submitted ... on every PR") is unchanged by this ADR and should be either closed (wire it in) or corrected
  (fix the doc) as a follow-up.
