---
title: 0022 - E2E Journey Coverage & Synthetic Fixture Expansion
date: 2026-09-07
status: accepted
---

# 0022 - E2E Journey Coverage & Synthetic Fixture Expansion

## Status

Accepted. Companion to [0021](./0021-unit-component-test-coverage-remediation.md). Lands as the phased
implementation PRs sequenced below; see [Implementation](#implementation) for progress. Confirmed with the repo
owner:

- Fixture strategy: build a **synthetic, CMS-agnostic fixture site** (Decision §1), not a mirror of the live
  Contentful content, since content changes independently of code and a fixture tied to today's real copy would
  drift immediately. The fixture stays entirely fictional — no real page/nav content from the live Contentful
  space needs to be mirrored into it.
- Device/browser matrix: **expand** the existing Playwright projects (Decision §3).
- Delivery: **phased PRs**, sequenced by journey group, each with its own changeset (see the companion report
  for the proposed sequence).
- Visual regression stays out of scope for this suite: Playwright E2E covers functional journeys only, since
  Storybook + Chromatic already own visual regression at the component level. No `toHaveScreenshot` assertions
  are planned as part of this expansion.

## Context

ADR [0006](./0006-playwright-e2e-strategy.md) and [0007](./0007-playwright-production-setup.md) established the
E2E architecture: Block Object Models over Page Object Models, MSW-mocked GraphQL at the Node.js server level
(because Next.js Server Components fetch outside the browser's network layer), and factory functions shared
with Vitest. That architecture is sound and requires no change. What's missing is everything built *on top of*
it — the actual suite is two trivial specs:

- `tests/e2e/example.spec.ts` — asserts `<main>` is visible on `/`.
- `tests/e2e/smoke.spec.ts` — asserts the header and first sidebar menu item are visible on `/`.

And the fixture data behind both is a single mocked page (`GetPageByPath` → one "Home" page with an **empty**
`blocksCollection`) plus a nav with 2 links (`tests/mocks/handlers.ts`). No test currently renders a single
real Block — not `HeroBanner`, not `CardGrid`, not `TimelineSection`, not `SplitContentPanel`, not
`PanelShowcase` — because the only mocked page has no blocks in it, and `src/app/(app)/[[...slug]]/page.tsx`
renders only a bare `SectionHeading` around whatever `ContentfulPage` mounts. `tests/mocks/factories.ts` (the
file ADR 0006 §3 says both Vitest and Playwright should share) is a near-empty skeleton: one generic
`createFactory` helper and one commented-out example — no actual per-content-type factories exist yet.

Additionally:
- `axe-playwright` is an installed dependency and is *described* in `docs/05-testing.md` as part of the
  strategy, but `grep -rn "axe-playwright\|checkA11y"` across `tests/` and `src/` returns zero matches — no
  accessibility check has ever actually run.
- The device matrix in `playwright.config.ts` covers Chromium/Firefox/WebKit desktop + one mobile profile
  (Pixel 5, Chrome). There is no iOS/WebKit mobile profile and no tablet-width profile, despite `SidebarNav`
  collapsing into a `Drawer` and `BottomDock` existing specifically as a mobile-first navigation surface —
  exactly the responsive behavior most likely to break silently on a real iOS Safari viewport that isn't
  emulated by Desktop WebKit.
- There is exactly one Block Object Model pairing beyond the header/sidebar (`AppHeaderModel`,
  `SidebarNavModel`) — nothing for `CardGrid`, `TimelineSection`, `SplitContentPanel`, `PanelShowcase`,
  `ThemeToggle`, `BottomDock`, `NotFound`, or `ServerError`.

## Decision

### §1 — Synthetic fixture site (not a mirror of production content)

Extend `tests/mocks/handlers.ts` / `tests/mocks/factories.ts` into a small, deliberately fictional multi-page
site whose sole purpose is exercising every Block/Pattern the component layer can render, independent of
whatever the real Contentful space contains today. Proposed shape:

- **Layout fixture**: full nav (5-6 links, enough to test active-state highlighting, drawer scroll, and the
  bottom dock's primary-vs-overflow split if that distinction exists), both `resumeIcon`/`themeIcon`, a
  `themeList` with at least 2 themes, logo, footer text, global SEO.
- **One page per registry branch**, so each `ui` discriminant in `content-section.tsx`'s and
  `content-list.tsx`'s registries gets a real page to mount on:
  - `/` — `HeroBanner` (ContentSection) — today the only registered `ContentSection` variant.
  - `/about` — `SplitContentPanel` (bio-style), one page in each `reversed` state to cover ADR 0008's generic
    composable variant.
  - `/experience` — `TimelineSection` with 3+ `TimelineEntry` items, at least one with rich-text `body`
    containing multiple node types (heading, list, bold/link) so this doubles as an integration check against
    the rich-text work in ADR 0021 §1.3.
  - `/projects` — `CardGrid` with enough `MediaCard` items to test the `MotionStagger` entry animation and grid
    wrap at each breakpoint.
  - `/skills` (or similar) — `PanelShowcase` with 3+ tabs.
  - One page with an **unrecognized `ui` value**, to exercise the `BlockPlaceholder` fallback end-to-end (dev
    diagnostic surface, per ADR 0004).
  - One page whose `pageUrl` is requested but doesn't exist in the fixture, to exercise the real `notFound()`
    branch in `src/app/(app)/[[...slug]]/page.tsx`.
- Factories in `tests/mocks/factories.ts` should be typed against the generated Contentful SDK fragment types
  (`ContentSectionFieldsFragment`, etc.) so they can't silently drift from the real schema shape — directly
  reusable by the Vitest adapter tests from ADR 0021, fulfilling ADR 0006 §3's original intent.

### §2 — Journey groups (phased delivery, per repo-owner preference)

Proposed PR sequence, each independently mergeable and covering a self-contained slice:

1. **Fixture foundation** — the factories/handlers work in §1, with no new tests yet beyond updating the
   existing 2 smoke specs to assert against the richer fixture. This unblocks every group below.
2. **Global chrome & navigation** — `AppHeader` (logo, resume link opens in a new tab, theme toggle switches
   `data-theme` and persists across a reload), `SidebarNav` (every nav item navigates to the right route,
   active-item highlight follows the current route, drawer open/close on mobile viewports), `BottomDock`
   (visible only under the mobile breakpoint, primary links reachable).
3. **Per-block content journeys** — one spec file per Block, using new Block Object Models
   (`HeroBannerModel`, `CardGridModel`, `TimelineSectionModel`, `SplitContentPanelModel`, `PanelShowcaseModel`):
   content renders, internal interactions work (PanelShowcase tab switching, CardGrid item click-through if
   cards are links, TimelineEntry expand/collapse if applicable), and each Block's own responsive behavior at
   mobile/tablet/desktop widths.
4. **Routing & error surfaces** — direct navigation to a valid nested path, an invalid path rendering
   `NotFound` (`app/(app)/not-found.tsx`) with a working "home" link, and a forced server error rendering
   `ServerError` (`app/error.tsx`) with a working refresh action.
5. **Cross-cutting: accessibility** — wire up `axe-playwright`'s `checkA11y` as a shared fixture/afterEach hook
   run against every page-level journey above (not a separate suite), so accessibility regressions are caught
   in the same run rather than requiring a parallel a11y-only suite to stay in sync.
6. **Cross-cutting: full responsive/device sweep** — re-run the navigation + per-block specs (groups 2-3)
   across the expanded device matrix from §3, using Playwright's `test.describe.configure` / project
   parameterization rather than duplicating spec bodies per viewport.

### §3 — Expanded device/browser matrix

Add to `playwright.config.ts`'s `projects`:
- `Mobile Safari` (`devices["iPhone 14"]` or similar) — currently zero WebKit-based mobile coverage; Desktop
  WebKit does not emulate iOS Safari's viewport/touch/scroll behavior.
- A tablet-width project (e.g. `devices["iPad Mini"]` landscape, or a custom `viewport` in the 768-1024px
  range) — the codebase has no tablet-specific breakpoint testing today, and `SidebarNav`'s permanent-vs-drawer
  behavior is exactly the kind of thing that has a silent midpoint failure between mobile and desktop widths.

Accepted trade-off: total CI matrix grows from 4 to 6 projects × N spec files, increasing E2E job runtime.
Mitigate by keeping `fullyParallel: true` and, if CI time becomes a problem, restricting the new mobile/tablet
projects to the navigation + responsive-sweep groups (§2 groups 2 and 6) rather than the full spec set.

### §4 — Turn on accessibility checks

Wire `axe-playwright`'s `checkA11y` into the shared `tests/e2e/fixtures/test-base.ts` fixture (already the
composition point for `header`/`sidebar`) so every journey spec gets an automated WCAG check for free, per
group 5 above, rather than leaving the dependency installed and unused.

## Implementation

### PR 4 — Fixture foundation (§2 group 1) — done

`tests/mocks/factories.ts` now exports schema-typed factories (`createMockIcon`, `createMockImage`,
`createMockLink`, `createMockContentItem`, `createMockStatItem`, `createMockContentSection`,
`createMockContentList`, `createMockPage`, `createMockLayout`) instead of the near-empty skeleton. On top of
those, `tests/mocks/fixture-site.ts` assembles the actual synthetic site — a fictional persona ("Ada
Sparkline"), a 6-item nav, and one page per registry branch: `/about` (`HeroBanner` + `SplitContentPanel`,
see below for why these share a page), `/experience` (`TimelineSection`, one entry with a rich-text body
covering a heading, a list, a bold mark, and an inline hyperlink), `/projects` (`CardGrid`, 4 items),
`/skills` (`PanelShowcase`, 3 panels), and `/experiments` (an unregistered `ui: "Carousel"` value, to exercise
`BlockPlaceholder`). `tests/mocks/handlers.ts` now routes `GetPageByPath` by the requested `path` variable
against that page list instead of always returning the same single page. `example.spec.ts` and `smoke.spec.ts`
were updated to assert against this real content (page heading, hero avatar, header title, nav item count)
instead of just generic visibility.

Three things surfaced during this work that weren't anticipated when this ADR was written:

- **`src/middleware.ts` unconditionally redirects `/` to `/about`.** A fixture Page at path `/` is therefore
  unreachable through real navigation — the `GetPageByPath({ path: "/" })` request is never made, because the
  redirect happens before the route even resolves. The plan in §1 assumed `/` would render the `HeroBanner`;
  in the real implementation the `HeroBanner` and the `SplitContentPanel` bio rows both live on `/about`
  instead, since that's the page a visitor actually lands on.
- **`SplitContentPanel` has no "reversed" layout variant.** `SplitContentPanelProps` (in
  `split-content-panel.tsx`) is just `{ description, infoRows }` — there's no prop that flips its layout. The
  "one page in each `reversed` state" idea in §1 doesn't correspond to anything the component actually
  supports today, so it was dropped rather than fixture-testing a variant that doesn't exist.
- **Next.js's on-disk fetch Data Cache was silently defeating MSW mocking.** `contentfulSdk`'s GraphQL calls
  go through the default Next.js `fetch()` Data Cache, which persists to `.next/cache/fetch-cache` across dev
  server restarts. Once that cache held a response from a real (unmocked) run, every subsequent "mocked" E2E
  run kept serving the stale real Contentful data instead of MSW's fixture — silently, with no error, because
  the cache hit short-circuits before the (correctly-listening) MSW interceptor ever sees a request. This had
  apparently been true since ADR 0007 first set up MSW; it went unnoticed because the two original smoke specs
  only asserted generic visibility (a header, *a* sidebar item) that real content also satisfies. It became
  impossible to miss once the fixture's fictional persona ("Ada Sparkline") diverged sharply from the real
  site's content. Initially patched by having `playwright.config.ts`'s `webServer.command` clear
  `.next/cache/fetch-cache` before every run — **superseded in PR 6** by removing the cache entirely at the
  source (see below), which this comment is kept only as a defense-in-depth no-op.

One more pre-existing bug came out of actually exercising the header BOM: `AppHeaderModel.titleLink` was
`.navbar-start .btn-ghost`, which also matches the drawer toggle button (both carry `btn-ghost`) — a Playwright
strict-mode violation the moment anything called `getTitle()`. Never caught before because nothing had. Fixed
to `.navbar-start a.btn-ghost`.

### PR 5 — Global chrome & navigation (§2 group 2) — done

`tests/e2e/navigation.spec.ts` covers the header (resume link opens in a new tab, theme toggle switches
`data-theme` across two theme choices) and the sidebar (every non-redirecting nav item navigates to its page
and picks up the active-item highlight), plus a mobile-only BottomDock spec (all 6 nav items present, tapping
one navigates). New Block Object Models: `ThemeToggleModel`, `BottomDockModel`; `SidebarNavModel` grew
`navLink()`/`isActive()`. All four specs run per-viewport-conditional (`test.skip` based on
`page.viewportSize()`) rather than as separate spec files, since the sidebar and dock are mutually exclusive
depending on breakpoint.

This group found three more real gaps, on top of PR 4's:

- **The active-sidebar-item highlight blocked clicks on the already-active item.** `SidebarNav`'s
  `layoutId="activeSidebarNav"` overlay `<div>` had no `pointer-events-none`, so re-clicking the current page's
  own nav link (e.g. re-navigating to `/about` while already there) silently did nothing — the overlay ate the
  click. Fixed in `sidebar-nav.tsx`.
- **`ThemeToggle` never applies `defaultTheme` to the DOM on load.** `<html>` carries no `data-theme` attribute
  at all until a user actively picks one from the dropdown — the component's initial React state matches
  `defaultTheme`, but nothing calls `document.documentElement.setAttribute` until `handleThemeChange` fires
  from a click. The plan text in §2 group 2 ("theme toggle ... persists across a reload") doesn't hold either:
  there's no `localStorage`/cookie persistence anywhere in the component, so a reload always loses the
  selection. Both are product-behavior facts the fixture/spec now assert as-is rather than an aspiration to
  test against.
- **Drawer open/close only has a testable window in the 768-1023px tablet range.** The fixture's layout uses
  the `dock-on-mobile` drawer variant. Below 768px, `DrawerButton`/`DrawerSide` render `sr-only` placeholders
  (the BottomDock takes over) — there's no way to open/close the sidebar drawer at all. At the current desktop
  viewports (≥1024px), `DrawerButton` is `lg:hidden`. That leaves only the not-yet-added tablet project (§3) as
  a place to actually exercise the toggleable drawer; group 2 does not cover it for that reason.

### PR 6 — Infra hardening (unplanned, raised by repo owner) — done

Reviewing PRs 4-5, the repo owner flagged that the suite still felt "immature" — a redundant `example.spec.ts`
placeholder, a local `pnpm test:e2e` run failing for reasons the fix history didn't explain, and no answer to
"is this actually solid, or does it just happen to pass for me." That prompted a harder look at *why* PR 4's
fetch-cache finding was possible at all, rather than treating the `webServer.command` clear as the fix:

- **Root cause eliminated: `src/contentful/lib/client.ts` now passes `cache: "no-store"` to `GraphQLClient`.**
  The PR 4 fix only cleared `.next/cache/fetch-cache` when Playwright itself started a fresh server. It did
  nothing when `reuseExistingServer: !process.env.CI` (true locally) found a server *someone else* had already
  started — including one Playwright itself was managing for a previous test run. Reproduced directly: booted
  a plain, unmocked `next dev` right after a mocked Playwright run, and it served the *mocked fixture's*
  stale cached response despite having mocking disabled — proving the disk cache leaks in either direction and
  that clearing it only at one call site was never going to be reliable. `graphql-request`'s `GraphQLClient`
  config accepts arbitrary `RequestInit` fields, which it spreads into the underlying `fetch()` call
  (confirmed by reading `runRequest.js`) — `cache: "no-store"` there means Contentful responses are never
  written to Next's Data Cache in the first place, in dev or production. This is also a real production
  finding, not just a testing one: without it, a content edit in Contentful might never appear on the deployed
  site without a redeploy, since nothing was ever set to revalidate the cached response. `no-store` was chosen
  over a `next: { revalidate: N }` window because it needs no tuning and is always correct; an ISR-style
  revalidate period is a reasonable alternative if the extra Contentful API traffic ever becomes a concern.
- **Added `tests/e2e/global-setup.ts`.** Runs once before the suite, requests `/about`, and fails the entire
  run immediately with one specific, actionable message if the fixture's persona name isn't present — instead
  of a scattered handful of confusing failures across unrelated spec files whenever the server Playwright ends
  up testing against (started fresh, or reused per `reuseExistingServer`) isn't actually serving the mocked
  fixture. Verified directly: pointed it at a real unmocked server and confirmed it fails fast with the
  intended message, then confirmed a correctly-mocked run passes it transparently.
- **Removed `tests/e2e/example.spec.ts`.** It was the original Playwright-scaffold placeholder and had become
  fully redundant with `smoke.spec.ts` once the fixture site existed; its one distinctive assertion (avatar
  image visible) was folded into `smoke.spec.ts` instead of living in its own near-empty file.
- **Local setup gap: Playwright's browser binaries were never documented as a one-time install step.** Unlike
  CI (which has its own explicit install step), nothing in this repo told a contributor to run
  `pnpm test:e2e:install` before `pnpm test:e2e` works locally — the most likely explanation for "some tests
  fail and I don't know why" on a machine that has never run Playwright before. Added the script and a
  "Local Setup" note in `docs/05-testing.md`.
- **CI ordering checked, not changed.** `.github/workflows/ci.yml`'s "Cache Next.js Build" step (which
  restores/saves `.next/cache`) runs *after* "Run E2E Tests" in the job, so a CI run's E2E step never sees a
  cache restored from a previous run regardless of this fix — the fetch-cache bug was never actually reachable
  in the current CI job as written. It's undocumented, easy to invalidate with an innocent step reorder, and
  now moot besides: `cache: "no-store"` means there is nothing to restore.

Remaining groups (3 — per-block content journeys, 4 — routing & error surfaces, 5 — accessibility, 6 — device
sweep) are not yet implemented.

## Considered Options

- **Mirror the real, live Contentful site content in fixtures.** Rejected per repo-owner decision: real content
  changes independently of code (new jobs, new projects, copy edits), so fixtures anchored to it would need
  constant upkeep just to stay accurate, and a content edit in Contentful could break E2E tests for reasons
  having nothing to do with a code regression.
- **Traditional Page Object Models per URL route.** Rejected, consistent with the existing ADR 0006 decision —
  routes are CMS-driven and generic; Block Object Models composed per-page already fit this codebase's grain.
- **Separate, standalone a11y-only spec suite.** Rejected in favor of folding `checkA11y` into the shared
  journey fixture (§4) — a parallel a11y suite would need its own page-visit list kept in sync with the real
  journeys, doubling maintenance for no benefit over asserting it inline.
- **Keep the current 4-project device matrix and rely on Desktop WebKit as a proxy for mobile Safari.** Rejected
  per repo-owner decision (§3) — Desktop WebKit does not emulate iOS viewport/touch semantics, which is exactly
  where the app's drawer/dock responsive logic is most likely to have an undetected gap.

## Consequences

### Positive
- The E2E suite starts actually exercising the application's primary value proposition (CMS-driven page
  content rendering across all Block types), not just "does the shell mount."
- Fixture work is shared groundwork with the ADR 0021 adapter unit tests (both need realistic, schema-typed
  mock data), so sequencing them together (§2 group 1) avoids building the same mock shapes twice.
- Automated accessibility coverage goes from "documented but not implemented" to actually running in CI, at no
  additional dependency cost (already installed).

### Negative / Trade-offs
- Building out a synthetic fixture site is nontrivial up-front work — it is, in effect, hand-authoring a second
  "test space" content model in TypeScript that must be kept structurally valid against the real generated SDK
  types.
- CI E2E runtime increases from both more spec files and a larger device matrix (§3); needs monitoring once
  implemented, with the mitigation in §3 available if it becomes a bottleneck.
- A synthetic fixture, by design, cannot catch a real Contentful schema drift or a live-data edge case (e.g., an
  editor leaving a required field empty in production) — this was already an accepted trade-off of ADR 0006 and
  is unchanged here, not newly introduced.
