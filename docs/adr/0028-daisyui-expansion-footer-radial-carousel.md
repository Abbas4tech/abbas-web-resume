---
status: accepted
date: 2026-09-09
---

# 28. DaisyUI Component Library Expansion — Footer, Radial Progress, Carousel

## Context

A repo-wide review compared the existing Elements → Patterns → Blocks inventory against
DaisyUI's full component catalog, cross-checked against the project's own version-pinned
skill (`.agents/skills/daisyui`, `version: 5.5.x`, matching the installed `daisyui@5.5.23`)
rather than the live marketing site, which was found to document components (`Aura`,
`Megamenu`) not yet in the installed version. The review surfaced two concrete,
already-anticipated gaps and one natural variant of an existing Block:

1. **`layout.footerText`** is fetched and adapted (`src/contentful/adapters/layout.ts`)
   but never rendered anywhere in the app — a pure dead-data gap.
2. **`ui: "Carousel"`** exists as an unregistered placeholder string in the E2E fixture
   (`tests/mocks/fixture-site.ts`, `/experiments` page) purely to exercise the
   `BlockPlaceholder` dev-mode fallback — not a reserved slot in either content type's
   schema. A carousel is semantically a list of slides, so it belongs on `ContentList`
   (like `CardGrid`), not `ContentSection`, where the fixture placeholder happened to
   live.
3. **`PanelShowcase`** renders its tech-skill rows as linear `Progress` bars only.
   DaisyUI's `radial-progress` is a direct sibling of the already-wrapped linear
   `progress` Element, and the exact `subItems` data `PanelShowcase` already consumes
   supports an alternate render with zero new Contentful fields — the same shape of
   decision ADR 0026 made for `TimelineSectionWithBadges`.

## Decision

### 1. `Footer` — new structural Block

`src/components/blocks/footer/` (six-file trio matching every existing Block). `adaptFooter`
reuses `extractNavPages` (`src/contentful/adapters/nav-mapper.ts`) — the same helper
`BottomDock`/`SidebarNav` already use — so the footer's nav links are guaranteed to match
the site's actual navigation, not a separately-maintained list. Mounted in
`contentful-layout.tsx` as a sibling to `AppHeader`/`Drawer`, inside `DrawerProvider`. No
Contentful schema change — `footerText`, `email`, and `navigationLinksCollection` are
already live fields on `Layout`.

DaisyUI's `footer-title` class was applied to a `<span>`, not the conventional `<h6>` — an
`<h6>` directly after a page's deepest heading (h2/h3 everywhere in this app; there is no
h4/h5 anywhere) fails axe's `heading-order` rule by skipping three levels. `footer-title`
is purely a CSS class with no semantic requirement to be a heading element, so dropping the
heading tag entirely satisfies both DaisyUI's visual styling and the site's actual (already
enforced, not just aspirational) zero-a11y-violation baseline.

### 2. `PanelShowcaseWithRadialProgress` — second render style, no new Block directory

Following the `TimelineSectionWithBadges` precedent exactly: no new component directory.

- New Element `src/components/elements/ui/radial-progress/radial-progress.tsx`, sibling to
  `progress.tsx` — same `role="progressbar"`/`aria-valuenow`/`aria-label` contract, DaisyUI's
  `radial-progress` class + `--value` CSS variable instead of a hand-rolled width animation.
- New Pattern `src/components/patterns/icon-radial-progress-row/` — exact structural mirror
  of `icon-progress-row.tsx`, swapping `Progress` for `RadialProgress`.
- `PanelShowcaseRow` gained an optional `variant?: "linear" | "radial"` field (defaults to
  `"linear"` — every existing caller keeps compiling and rendering unchanged). `panel-showcase.tsx`
  branches on it to pick `IconProgressRow` or `IconRadialProgressRow`.
- `panel-showcase.adapter.ts` gained `adaptPanelShowcaseWithRadialProgress`, sharing a new
  `buildRows(panel, variant)` helper with the original `adaptPanelShowcase` — the same
  shared-helper shape ADR 0026 used for `buildBaseMetaRows`.
- One new `content-list.tsx` registry entry (`PanelShowcaseWithRadialProgress`), one new
  `setup-content-model.ts` enum value. No new Playwright model — `panel-showcase-model.ts`'s
  `progressBar()` already queries the generic `role="progressbar"`, satisfied by both variants.

### 3. `Carousel` — new `ContentList` Block

`src/components/blocks/carousel/` (six-file trio, mirroring `card-grid/`). Registered under
`LIST_BLOCK_REGISTRY`, **not** `SECTION_BLOCK_REGISTRY` where the fixture's placeholder string
happened to live — a carousel is a list of slides, and `ContentList.customEntries` is the
existing many-items data source (`CardGrid`'s own source), where `ContentSection` wraps
exactly one entry. The `/experiments` fixture's unregistered-`ui`-fallback demo is untouched;
it keeps validly exercising `BlockPlaceholder` for `ContentSection`, just no longer sharing a
string with a now-real `ContentList` Block.

`adaptCarousel` sources each slide's image from `customEntries[i].coverImage`, not `.image`
— `.image` is already `CardGrid`'s thumbnail field, and `coverImage` was fetched/adapted on
every `ContentItem` but had no consumer anywhere in the registry until now. `links` passes
through as `AdaptedLink[]` unflattened, matching `CardGridProps`'s own convention (image
fields get flattened to primitives; links do not — this is the actual established pattern,
confirmed against `MediaCard`'s existing props, not the stricter fully-flattened shape
originally sketched before implementation).

Added a second `ContentList` fixture (`ui: "Carousel"`, two slides sourced from
`item-proj-fixture-dashboard`/`item-proj-fixture-cli`'s corresponding highlight content) to
`/projects`' `bottomContentAreaCollection`, alongside the existing `CardGrid` list — `Page`'s
content areas already support mixed `ContentSection`/`ContentList` arrays
(`contentful-page.tsx`), so no page-model change was needed to add a second list to one page.

## Considered Options

- **Mount `Footer` outside `DrawerProvider`, as a sibling to it in the root layout.**
  Rejected: every other structural chrome Block (`AppHeader`, `SidebarNav`, `BottomDock`)
  reads `useDrawer()`-adjacent state or is scoped inside the provider; keeping `Footer`
  inside it costs nothing today and avoids a second provider boundary if a future footer
  variant ever needs drawer state (e.g. hiding on the dock-on-mobile variant).
- **Give `PanelShowcaseRow`'s variant its own row-level component split instead of a shared
  `PanelShowcase.tsx` branch.** Rejected in favor of matching `TimelineSectionWithBadges`'s
  established shape as closely as possible — one component, a discriminated field, two
  adapters — rather than introducing a second pattern for varying a single Block.
- **Register `Carousel` under `ContentSection`, matching the fixture's existing placeholder
  location exactly.** Rejected — semantically wrong (a carousel is inherently multi-item),
  and would have required flattening a `ContentList`'s worth of desired slides into a single
  `ContentSection` entry with no natural field for "more than one slide."

## Consequences

### Positive
- `footerText` — documented in the content model and adapted since early in the project,
  never rendered — is now wired up, closing a real gap between the schema's stated intent
  and the code (the same category of fix ADR 0026 made for `subItems`).
- Both new Storybook variants (`Blocks/Footer`, `Blocks/Panel Showcase → WithRadialProgress`)
  and the new `Blocks/Carousel` stories, plus all new/updated adapter and component specs,
  pass alongside the full existing suite: verified with the same rigor as prior ADRs
  (typecheck, 311/311 unit tests, zero E2E accessibility violations on the new/touched pages).
- The `Carousel` gap the fixture site was gesturing at since ADR 0022 is now closed with a
  real Block, not just a documented placeholder.

### Negative / Trade-offs
- The `contentList.ui` schema's `in` validation now needs a live push
  (`pnpm contentful:setup`) to accept `"PanelShowcaseWithRadialProgress"` and `"Carousel"`
  as real editor-facing values — deferred pending explicit go-ahead, matching ADR 0026's own
  live-push precedent. Until pushed, both new `ui` values only exist in the local schema
  script and the E2E fixture, not the live Contentful space.
- `RadialProgress` intentionally drops the linear `Progress` element's shimmer-sweep motion
  (`motion/react`-driven) in favor of DaisyUI's static `--value`-based ring — a real visual
  regression *if* animation parity were required, accepted here since DaisyUI's own
  `radial-progress` component has no equivalent built-in motion primitive to match against.
