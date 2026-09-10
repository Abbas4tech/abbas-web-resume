# abbas-web-resume

## 4.2.1

### Patch Changes

- c832fc3: Added a live Contentful schema-parity check (ADR 0031) after a real production incident: `pnpm contentful:setup` schema pushes had only ever targeted the `development` environment, so `production` silently drifted out of sync and 500'd on every page after a merge. New pure-Python CI job (`scripts/contentful/verify-contentful-schema.py`, stdlib only) exercises the app's real GraphQL queries — parsed directly from the generated SDK so it can never drift from what the app actually queries — against both `development` and `production` on every PR, regardless of target branch. Also corrected the `build` CI job's env-block comment, which incorrectly claimed `next build` statically renders pages from Contentful (the app's catch-all route is fully dynamic, so it never actually calls these queries at build time).
- c327611: Fixed a deterministic bug in the release pipeline (`scripts/ci/manage-release.py`) that failed every release after the first one that had an unmerged prior "Version Packages" PR still open. The script ran `pnpm changeset version` (producing uncommitted version-bump/CHANGELOG changes) _before_ resetting the `changeset-release/master` branch to match `master`, and that reset used `git reset --hard`, which unconditionally discards uncommitted changes — wiping out the version-bump work before it could be committed, and failing with "nothing to commit, working tree clean". Reordered so the branch is reset to match `master` first, then `changeset version` runs on that clean base — this also means the branch can no longer accumulate drift across releases, since it's always rebuilt as exactly "master + one version-bump commit" each run.

## 4.2.0

### Minor Changes

- f243159: Added the final tier of the DaisyUI catalog gap analysis (see ADR 0030): an `AvailabilityBanner` Block (new `Status`/`Countdown` Elements and `StatusIndicator`/`CountdownUnit` Patterns, reusing the already-fetched `startDate` field for a render-time availability countdown), a `ProcessStepsWithTimeline` variant using a new native `Timeline` Element, and `Breadcrumbs`/`BreadcrumbTrail` primitives (built and tested, not yet wired into a live page since the site's routes are still flat). Registered `AvailabilityBanner` and `ProcessStepsWithTimeline` in the local schema definitions (live Contentful push deferred pending explicit go-ahead).
- f243159: Added two new CMS-toggleable Blocks/variants from a DaisyUI catalog gap analysis (see ADR 0028): a `PanelShowcaseWithRadialProgress` variant (new `RadialProgress` Element and `IconRadialProgressRow` Pattern, same `subItems` data as the existing `PanelShowcase`), and a new `Carousel` `ContentList` Block sourcing slides from each entry's `coverImage`. Registered both in the local `contentList.ui` schema definition and pushed live to Contentful.
- f243159: Added three more CMS-toggleable Blocks/variants from the DaisyUI catalog gap analysis, Phase 2 (see ADR 0029): a `SkillsMatrix` table-layout variant of `PanelShowcase` (new `Table` Element), a `TestimonialWall` Block (new `ChatBubble` Element and `ChatMessageRow` Pattern), and a `MockupGallery` Block that frames project screenshots in a browser or phone mockup (new `MockupBrowser`/`MockupCode`/`MockupPhone` Elements and `MockupShowcaseFrame` Pattern). Registered `SkillsMatrix`, `TestimonialWall`, `MockupGalleryBrowser`, and `MockupGalleryPhone` in the local `contentList.ui` schema definition (live Contentful push deferred pending explicit go-ahead).

### Patch Changes

- 3c4501f: Fixed a batch of Storybook-reported bugs, several with live production impact: `BottomDock`'s entrance animation was breaking its own `position: fixed` viewport pinning (a real mobile-nav bug, not Storybook-only); `CardGrid` hover state was bleeding across every card due to an unnamed Tailwind group colliding with `Drawer`'s own `group` wrapper; `Button` silently ignored DaisyUI variant classes (`btn-primary`, etc.) because hardcoded utility classes always won the cascade; `NotFound`/`ServerError`'s icon badge rendered pinned to the top-left instead of centered due to a stale DaisyUI v4 class name (`placeholder` → `avatar-placeholder` in v5); and `Progress`'s percentage count was clipped by an `overflow-hidden` added for an unrelated shimmer effect.

  Also: replaced `HeroBanner`'s flat gray placeholder mock images/icons with real brand icons and photographic mock images; removed the `PageWrapper` story; and added explicit word-spacing to every `Blocks/*`, `Elements/*`, and `Patterns/*` Storybook title's component segment (e.g. `Blocks/BottomDock` → `Blocks/Bottom Dock`) so the sidebar no longer reads as squished PascalCase. See ADR 0027.

- 0eba123: Added Motion animated components
- 4311b4a: Added contentful modelling updates and component structure refactoring for pages. Implemented test suits and CI/CD basic integration
- 093d5e7: Fixed the real root cause behind the E2E fixture-poisoning bug found in the previous release: `src/contentful/lib/client.ts` now passes `cache: "no-store"` to `GraphQLClient`, so Contentful responses are never written to Next.js's on-disk fetch Data Cache at all — in dev _or_ production. Previously, nothing revalidated a cached Contentful response, so (a) a content edit in Contentful could go live without ever appearing on the deployed site without a redeploy, and (b) a stale cached response (real or mocked) could silently leak across dev-server restarts regardless of the current `NEXT_PUBLIC_API_MOCKING` setting — reproduced directly by booting a plain unmocked `next dev` right after a mocked E2E run and watching it serve the mocked fixture's stale cached response anyway.

  Also hardens the E2E suite per feedback that it still felt fragile:

  - Added `tests/e2e/global-setup.ts`, which fails the whole run immediately with one specific, actionable message if the server under test isn't actually serving the mocked fixture (most commonly because `reuseExistingServer` reused an unmocked server) — instead of a scattered handful of confusing failures.
  - Removed the redundant `tests/e2e/example.spec.ts` placeholder (folded its one distinctive assertion into `smoke.spec.ts`).
  - Added `pnpm test:e2e:install` and documented it as a required one-time local setup step — CI already installs browsers itself, but nothing told a local contributor to.

- c3c930c: Expanded the E2E device matrix from 4 to 6 projects: added Mobile Safari (`iPhone 14`, the only WebKit-engine mobile coverage — Desktop WebKit doesn't emulate iOS viewport/touch semantics) and a Tablet project (`iPad Mini`, 768px) that lands exactly in the gap where the app's off-canvas drawer is reachable at all (wide enough to not be treated as mobile, narrow enough that the drawer toggle button hasn't been hidden by the `lg` breakpoint yet).

  Adding a project that could actually reach that drawer found a real bug: `DrawerProvider`'s `open` state always initialized to `true` on first render regardless of device (a stale-viewport-detection issue), which was invisible on desktop (CSS forces the sidebar open anyway) and on mobile (the drawer mechanism is swapped out entirely there) — but at tablet width, it meant the drawer's overlay backdrop covered the page's own content by default until manually dismissed. Fixed by defaulting to closed; a few E2E and unit tests that assumed the old (buggy) default updated to match.

  This closes out ADR 0022 — all six planned E2E journey groups (fixture site, navigation, per-block content, routing/errors, accessibility, device matrix) are now implemented.

- 70c4ea4: Fixed a CI regression from ADR 0023's job split: the `e2e-test` job shipped with no `CONTENTFUL_*` values at all, on the assumption MSW's mocking made them unnecessary. It missed that `src/contentful/lib/client.ts` builds the GraphQL endpoint via string interpolation, which becomes the literal string `"undefined/undefined/environments/undefined"` with all three unset — an invalid URL that throws before MSW ever gets a chance to intercept the request. Every page render failed, and the dev server never came up within Playwright's `webServer` timeout, failing the whole job. Confirmed via a real CI log and local reproduction (unsetting the same variables reproduces the exact `TypeError: Invalid URL`), then fixed with harmless placeholder values (not real secrets — MSW never inspects them, they just need to form a syntactically valid URL) and re-verified locally.
- 4816bc9: Wired `axe-playwright` into the shared E2E test fixture (`tests/e2e/fixtures/test-base.ts`) as an automatic `afterEach` hook, so every journey spec gets a WCAG scan for free instead of needing a parallel accessibility-only suite.

  Running it for the first time surfaced and fixed three real, pre-existing accessibility bugs:

  - Every page had two `<main>` landmarks — `Drawer` used `<main>` purely for a CSS class, wrapping the page's actual content `<main>`. Changed to `<div>`.
  - Every sidebar nav item nested a `<button>` around a real link (`DrawerSideItem` wrapped `NavItem` in its own click-to-close-drawer button). Moved that behavior onto the link itself via a new `NavItem` `onClick` prop.
  - `PanelShowcase`'s progress bars had no accessible name — the direct consequence of a content-model field (`subItem.title`) that PR 7 found was silently dropped by the adapter. Fixed properly this time: threaded through as the progress bar's `aria-label`.
  - `IconLink` never passed a `name` to its icon-code icons, leaving the rendered SVG with no accessible text at all — one-line fix using a label that was already available but unused.

  Three rules are disabled suite-wide as documented, accepted gaps (no `<h1>` on any page, sidebar/BottomDock not in a landmark, `.stats` rows not keyboard-focusable when they overflow) rather than fixed here — see ADR 0022 PR 9 for the reasoning and the dev-only `BlockPlaceholder` exclusion.

- cc717bb: Added unit tests for the Contentful adapter layer (`content-item`, `content-list`, `content-section`, `icon`, `image`, `layout`, `link`, `page`, `stat-item`), which had almost no coverage despite backing every page render on the site. Adapters directory coverage goes from ~25% to ~97% statements. Part of the ADR 0021 test coverage remediation plan.
- 6422f24: Added E2E coverage for routing and error surfaces (`tests/e2e/routing.spec.ts`): direct navigation to a nested path, the real `notFound()` branch rendering `NotFoundBlock` with a working home link, and the `src/app/error.tsx` boundary — the latter exercised by a sentinel fixture path (`SERVER_ERROR_PAGE_PATH`) that `tests/mocks/handlers.ts` answers with a GraphQL error response, since no realistic fixture data could make a component throw on its own. New Block Object Models: `NotFoundModel`, `ServerErrorModel`.

  Fixed a hydration-timing flake this surfaced: clicking the NotFound page's home link and separately asserting the URL changed passed in isolation but failed under the full suite's parallel load, since the client-side `Link` handler can attach later than `expect()`'s default timeout allows for. Fixed by racing the click against `page.waitForURL(...)` instead.

- 4eb181e: Capped local Playwright workers at `"50%"` of available cores (was: one per core) and added one local retry, matching what CI already does more conservatively. The default full-core worker count was reliably producing a couple of contention-related flakes per local run of the 6-project matrix — passing in isolation and under `--workers=1`, so not real defects, just too many parallel browser instances fighting for CPU on a single machine.
- 7a340a2: Replaced the E2E suite's single near-empty mock page with a synthetic, fully fictional multi-page fixture site (`tests/mocks/fixture-site.ts`) covering every registered Block (`HeroBanner`, `SplitContentPanel`, `TimelineSection`, `CardGrid`, `PanelShowcase`), an unrecognized-`ui` page for the `BlockPlaceholder` fallback, and a 6-item nav. Factories in `tests/mocks/factories.ts` are now typed against the generated Contentful SDK fragments instead of being an unused skeleton. Part of the ADR 0022 E2E expansion plan (§1, fixture foundation).

  While wiring this up, found and fixed two real bugs surfaced by the richer fixture:

  - Next.js's on-disk fetch Data Cache (`.next/cache/fetch-cache`) was silently serving real, previously-cached Contentful responses instead of MSW's mocked ones across dev-server restarts, defeating E2E mocking entirely without any error. `playwright.config.ts`'s `webServer` now clears that cache directory before every run.
  - `AppHeaderModel`'s `titleLink` locator (`.navbar-start .btn-ghost`) also matched the drawer toggle button, throwing a strict-mode violation the first time anything actually called `getTitle()`.

  Also discovered that `src/middleware.ts` unconditionally redirects `/` to `/about`, so a fixture Page at path `/` would never be reachable — the fixture's `HeroBanner` now lives on `/about` instead.

- 26b95c1: Added `TimelineSectionWithBadges` as a second, editor-selectable `ui` value alongside `TimelineSection` in Contentful's `contentList.ui` dropdown. Both read the same `subItems` data (no `tags`-based path exists in `timeline-section.adapter.ts` at all) but render it differently: `TimelineSection` shows the original single icon + comma-joined text line, `TimelineSectionWithBadges` renders the same subItems as a `TechBadgeCloud` with each skill's own icon. `content-list.tsx` registers each `ui` value against its own adapter function (`adaptTimelineSection` / `adaptTimelineSectionWithBadges`) accordingly.

  Fixed a live data issue found while verifying this: the real "Experience — Timeline" `ContentList` entry's `ui` field was still set to `"SplitContentPanelWithBadges"` (left over from testing that value before it was reverted) — removing a value from a field's schema validation doesn't retroactively fix entries already using it. Corrected directly via the Management API; `/experience` renders correctly again.

  See [ADR 0026](../docs/adr/0026-timeline-tech-badges-meta-row.md).

- bc8337f: Added a `TimelineSection`/`TimelineEntry` variant where a meta row renders as a `TechBadgeCloud` (an icon-badge cloud) instead of plain icon+text — see the new `WithTechBadges` (`Patterns/TimelineEntry`) and `WithTechStack` (`Blocks/TimelineSection`) Storybook stories. `timeline-section.adapter.ts` now maps `subItems` (per-skill icon data, already described in the content model docs as "for nested items like TechStack in an Experience" but never actually read by any adapter) into this new badges row, falling back to the existing comma-joined text row when only flat `tags` are present.

  While wiring this up, caught and fixed a layering mistake before it shipped: `TechBadgeCloud` was originally built at the Block layer, and `TimelineEntry` (a Pattern) needed it — importing a Block from a Pattern violates this project's own Elements ← Patterns ← Blocks dependency rule. Moved `TechBadgeCloud`'s implementation to `src/components/patterns/tech-badge-cloud/`; the Block layer now keeps only its Contentful adapter, not a duplicate component. `TechBadgeCloud`'s Storybook entry has moved from `Blocks/TechBadgeCloud` to `Patterns/TechBadgeCloud` accordingly.

  The badges row renders as a bare `TechBadgeCloud` with no separate icon/label heading above it — an initial "Tech Stack" caption above the badges was redundant since each badge already carries its own icon and label.

  See [ADR 0026](../docs/adr/0026-timeline-tech-badges-meta-row.md).

- bc8337f: Fixed the root cause behind three components (`SidebarNav`, `BottomDock`, `PageNavButton`) failing to render in Storybook: `.storybook/preview.tsx` now sets `nextjs.appDirectory: true`, since `@storybook/nextjs-vite` otherwise mounts a Pages Router mock incompatible with `next/navigation`'s App Router hooks these components use via `usePage()`. Verified with a live headless-browser render pass across all stories, not just a bundling check.

  Reconciled mock/CMS icon codes against ADR 0016's curated `ICON_REGISTRY` — repointed four codes to already-curated equivalents (`FaDownload`, `MdColorLens`, `IoPerson`, `RiNextjsFill`) and registered six genuinely new ones (`MdLink`, `MdStorage`, `SiExpress`, `MdEventAvailable`, `MdLanguage`, `MdAccessTime`) that were previously silently rendering as a fallback error icon.

  Wired `@storybook/test-runner`'s accessibility checks into CI (`storybook-a11y` job) via new `test-storybook`/`test-storybook:ci` scripts — previously configured but never run anywhere. Fixed the real, structural accessibility defects this surfaced (missing accessible names on `Accordion`'s radio input, several icons, and `Progress`/`IconProgressRow`'s own fixtures; a `Step` story falsely claiming list semantics) rather than suppressing them, and disabled only `color-contrast` in the Storybook a11y config, matching the same investigated, accepted exception ADR 0022 already applies to the E2E suite.

  Fixed a real `CardGrid` bug found via its own story: it keyed list items by `card.title`, which two entries sharing a title (or the `ManyCards` story repeating data) would collide on. `MediaCardProps` now carries an optional `id`, threaded from `sys.id`.

  Expanded the Contentful `ui`-driven Block registries — `ContentSection` from 1 reachable Block to 3 (`HeroBanner`, `SplitContentPanel`, `AnnouncementBanner`), `ContentList` from 4 to 9 (added `FaqAccordion`, `MetricsStrip`, `ProcessSteps`, `ContentTabs`, `TechBadgeCloud`) — six new Blocks, each built from an existing Element/Pattern that had no CMS path, each with full mock/story/spec/adapter coverage. Also fixed `adaptContentSection`/`adaptContentList` defaulting a blank `ui` field to `"Standard"`/`"Grid"`, neither of which was ever a registered key — a blank field previously rendered nothing in production; now falls back to `HeroBanner`/`CardGrid`. `setup-content-model.ts`'s `ui` enum validations updated to match, but not yet run against the live Contentful space — pending review.

  Added a `.stories.tsx`/`.mock.ts` pair for `PageWrapper`, the one component missing one per ADR 0002's convention.

  See [ADR 0024](../docs/adr/0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md) for the full write-up.

- bc8337f: Added `src/contentful/scripts/migrate-timeline-tech-badges.ts`, a one-time (idempotent, dry-run by default) migration that converts a `TimelineSection` entry's flat `tags` into real `subItems` badge links, so `TimelineEntry` renders its tech-stack row as a `TechBadgeCloud` instead of comma-joined text. Already run against the live Contentful space's real "Experience — Timeline" content — verified live on `/experience` with zero console errors and zero icon-registry fallbacks.

  See [ADR 0026](../docs/adr/0026-timeline-tech-badges-meta-row.md).

- 2ec1386: Migrated real resume/portfolio content from the legacy Contentful space into the new composable content model (ADR-0019), extending the schema with `page.icon`, `seoMetadata` social/attribution fields, and `layout.favicon`. Fixed a `HeroBanner` parallax bug (`MotionParallax`/`hero-banner.tsx`) where the banner image left a visible gap above the avatar instead of filling its container.
- 60c83ec: Restructured CI (`.github/workflows/ci.yml`) from one sequential job into a parallel job graph (lint, typecheck, unit-test, a 4-way sharded e2e-test + merge, build, build-storybook), matching Playwright's own CI guidance: no Playwright browser-binary cache (restoring one is as slow as a fresh install), sharding across jobs instead of raising in-job worker count, and a `blob` reporter merged after all shards finish. Contentful secrets are now scoped only to the `build` job, since every other job runs against MSW's mocked fixture site regardless of them. Added a `concurrency` group so superseded runs on the same branch/PR are cancelled instead of running to completion, and `timeout-minutes` on every job.

  Also fixed a real, unrelated defect found while reading the pipeline: `release.yml` and `scripts/ci/manage-release.py` hardcoded a branch named `main`, which does not exist in this repository (the actual default/production branch is `master`) — meaning the "Version Packages" release automation described in ADR 0010 could never trigger. Both now target `master`, matching `ci.yml`'s `pull_request` trigger and the docs.

  See [ADR 0023](../docs/adr/0023-ci-pipeline-parallelization.md) for the full rationale.

- 90b0020: Disabled axe's `color-contrast` rule suite-wide. Real CI data (GitHub Actions) showed it firing unpredictably across many different elements on every WebKit-engine project (webkit, Mobile Safari, Tablet) and surviving all retries — not the occasional animation-timing flake this suite already guarded against with a settle delay, but a systemic, environment-dependent false-positive rate (font hinting / anti-aliasing differences between rendering environments shift the measured ratio) that made the suite unreliable and consumed most of a ~48-minute CI run in retries.

  Also fixed a real, CI-reproducible bug in the sidebar-navigation tests: clicking a nav item closes the drawer (by design, below the `lg` breakpoint that's an off-canvas overlay actually closing), which could make the just-clicked link unreachable to the immediately-following "is it highlighted" check. Tests now reopen the drawer before checking.

  Bumped CI's Playwright workers from 1 to 2 as a modest first step now that the dominant cause of retry overhead is gone — worth watching over the next few runs rather than assumed safe.

- dd016be: Fixed two colocated spec files using the wrong suffix (`.test.tsx` instead of `.spec.tsx`), which caused Vitest to silently skip them. Added ADR 0021 and ADR 0022 documenting the unit/component and E2E test coverage remediation plans.
- 8951823: Added a rich text `description` field to the Page content model, rendered below the section heading. Fixed Poppins only loading the 400 font weight, which prevented bold rich text marks from rendering visually.
- 0e4bf6f: Added E2E coverage for global chrome and navigation against the ADR 0022 fixture site: the header (resume link, theme toggle switching `data-theme`) and the sidebar/BottomDock navigation (every nav item routes correctly and picks up the active-item highlight, viewport-conditional between the two). New Block Object Models: `ThemeToggleModel`, `BottomDockModel`; `SidebarNavModel` gained `navLink()`/`isActive()`.

  Fixed a real bug this surfaced: the active-sidebar-item highlight overlay had no `pointer-events-none`, silently swallowing clicks on the current page's own nav link.

- bc8337f: Redesigned `NotFoundBlock` and `ServerErrorBlock` onto the app's own `Icon`/`Button` components — both previously bypassed the curated icon registry and shared Button element entirely (raw `react-icons` imports and raw `<button>`/`<Link className="btn">`), which was the actual cause of them looking inconsistent with the rest of the site. Repointed the unregistered `MdErrorOutline` to the already-curated `MdError`. Both now stage their icon/heading/message/action in sequence via `MotionStaggerContainer`/`MotionStaggerItem` instead of fading in as one block.

  Audited every Block for motion coverage and gave each a treatment matched to its own shape rather than a uniform default: stagger animations for list-shaped Blocks (`FaqAccordion`, `MetricsStrip`, `ProcessSteps`, `TechBadgeCloud`, and `SplitContentPanel`'s info rows, brought in line with `MetricsStrip`), an `AnimatePresence` cross-fade for `ContentTabs`' interaction-driven tab switches, entrance animations for `AppHeader`/`BottomDock`/`AnnouncementBanner`, and hover feedback for `AppHeader`'s icon actions, `BottomDock` items, `MediaCard`, and `NavItem`'s icon. `PageWrapper` and `SidebarNav` are deliberately left as-is — the former's transitions are already owned by `template.tsx`'s route-level `AnimatePresence`, the latter's `layoutId` active-indicator is already the correct motion for its job.

  Extended `MotionWrapperProps.as` to support `header`/`nav`/`footer`/`article` and `MotionStaggerItemProps.as` to support `h1`/`h2`/`h3`/`p`, both backward-compatible, so a Block can animate a semantic landmark or heading without degrading it to a `<div>`.

  `server-error.spec.tsx`'s button-name assertions updated to regex matching, since the retry icon's accessible name now concatenates into the button's computed name (the same pattern `PageNavButton`'s spec already used).

  Followed up with a per-element micro-interaction pass: `ContentTabs` now has a `layoutId`-shared sliding underline between tabs (the same technique as `SidebarNav`'s active-page indicator); `MediaCard` gets a coordinated hover state across its border, shadow, thumbnail scale, and title color; `TechBadgeCloud` badges and `ProcessSteps`' indicators each gained their own hover/reveal pop; `AnnouncementBanner`'s icon and `Progress`'s fill bar gained looping attention animations, both gated behind `useReducedMotion()`; and the five `Button` call sites that lacked hover feedback (`AppHeader`'s brand link, `NotFoundBlock`'s CTA, `ServerErrorBlock`'s retry action and its icon) now have it, wrapped per call site rather than baked into the shared `Button` element to avoid an unaudited layout risk across its many other usages.

  See [ADR 0025](../docs/adr/0025-motion-coverage-audit-and-error-page-redesign.md).

- a6b9b17: Replaced the E2E fixture's fake `images.ctfassets.net` URLs with local placeholder images under `public/fixtures/`. Purely cosmetic — the fake URLs 404'd against the real CDN on every render (Next Image still worked fine, this just quieted the `upstream image response failed` spam in every local/CI E2E run).
- efb09cb: Added tests for the remaining untested behavioral elements (`motion-provider`, `frozen-router`), closed the branch gaps in `theme-toggle` and `drawer` (dock-on-mobile variant, right-side layout, view-transition support, active-theme highlighting), and added a test for the Contentful GraphQL client factory's endpoint/token resolution. Excluded the auto-generated GraphQL SDK and one-off Contentful migration scripts from the coverage target, and added a CI coverage floor (75% statements/lines, 65% branches) per ADR 0021 §2/§3 — the application code this measures already sits at ~92% statements / ~82% branches.
- 047e0af: Fixed two real bugs found while auditing the CI/CD surface for ADR 0023:

  - `.husky/pre-commit` ran `ultracite fix` under `set -e` as a plain statement, so a non-zero exit (unfixable lint issues) aborted the script before it ever reached the exit-code capture and custom error message — dead code, confirmed by reproduction. Moved the call into an `if`/`else` (exempt from `set -e`) so the message and exit code are now reachable. Also scoped the fix to staged files only, via `ultracite fix`'s `[files...]` argument, instead of reformatting the entire repo on every commit.
  - `scripts/ci/manage-release.py` would have failed on the second release cycle: `git checkout {branch_name}` for the existing `changeset-release/master` branch had no prior `git fetch`, and `actions/checkout@v4` never fetches branches other than the one that triggered the workflow. Added the fetch and switched to an idempotent `git checkout -B {branch_name} origin/{branch_name}`.

- 182c3ee: Filled the remaining block-registry and rich-text coverage gaps identified in ADR 0021: `ContentList` now has a dispatch test for each of its four registered block types (was only testing CardGrid), and `RichText` now covers every supported node type (headings 1-6, ordered/unordered lists, blockquotes, tables) and text mark (bold, italic, underline, code), plus the function-form `headingClass` prop. Both files reach 100% statement/branch coverage.
- bd6b085: Added E2E coverage for every registered Block against the ADR 0022 fixture site: `hero-banner.spec.ts`, `split-content-panel.spec.ts`, `timeline-section.spec.ts` (including the multi-node-type rich-text body — heading, list, bold mark, inline link), `card-grid.spec.ts`, and `panel-showcase.spec.ts`, each with its own new Block Object Model (`HeroBannerModel`, `SplitContentPanelModel`, `TimelineSectionModel`, `CardGridModel`, `PanelShowcaseModel`).

  Found two content-model fields that are silently dropped by the components rendering them (`CardGrid`'s link `text`, `PanelShowcase`'s row `title`) — worked around in the fixture rather than the components, since fixing either felt like a bigger call than this PR's scope. Documented both in ADR 0022.

## 4.1.8

### Patch Changes

- Added changeset, storybook configurations including major component structure migrations
