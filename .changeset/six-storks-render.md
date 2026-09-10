---
"abbas-web-resume": patch
---

Fixed the root cause behind three components (`SidebarNav`, `BottomDock`, `PageNavButton`) failing to render in Storybook: `.storybook/preview.tsx` now sets `nextjs.appDirectory: true`, since `@storybook/nextjs-vite` otherwise mounts a Pages Router mock incompatible with `next/navigation`'s App Router hooks these components use via `usePage()`. Verified with a live headless-browser render pass across all stories, not just a bundling check.

Reconciled mock/CMS icon codes against ADR 0016's curated `ICON_REGISTRY` — repointed four codes to already-curated equivalents (`FaDownload`, `MdColorLens`, `IoPerson`, `RiNextjsFill`) and registered six genuinely new ones (`MdLink`, `MdStorage`, `SiExpress`, `MdEventAvailable`, `MdLanguage`, `MdAccessTime`) that were previously silently rendering as a fallback error icon.

Wired `@storybook/test-runner`'s accessibility checks into CI (`storybook-a11y` job) via new `test-storybook`/`test-storybook:ci` scripts — previously configured but never run anywhere. Fixed the real, structural accessibility defects this surfaced (missing accessible names on `Accordion`'s radio input, several icons, and `Progress`/`IconProgressRow`'s own fixtures; a `Step` story falsely claiming list semantics) rather than suppressing them, and disabled only `color-contrast` in the Storybook a11y config, matching the same investigated, accepted exception ADR 0022 already applies to the E2E suite.

Fixed a real `CardGrid` bug found via its own story: it keyed list items by `card.title`, which two entries sharing a title (or the `ManyCards` story repeating data) would collide on. `MediaCardProps` now carries an optional `id`, threaded from `sys.id`.

Expanded the Contentful `ui`-driven Block registries — `ContentSection` from 1 reachable Block to 3 (`HeroBanner`, `SplitContentPanel`, `AnnouncementBanner`), `ContentList` from 4 to 9 (added `FaqAccordion`, `MetricsStrip`, `ProcessSteps`, `ContentTabs`, `TechBadgeCloud`) — six new Blocks, each built from an existing Element/Pattern that had no CMS path, each with full mock/story/spec/adapter coverage. Also fixed `adaptContentSection`/`adaptContentList` defaulting a blank `ui` field to `"Standard"`/`"Grid"`, neither of which was ever a registered key — a blank field previously rendered nothing in production; now falls back to `HeroBanner`/`CardGrid`. `setup-content-model.ts`'s `ui` enum validations updated to match, but not yet run against the live Contentful space — pending review.

Added a `.stories.tsx`/`.mock.ts` pair for `PageWrapper`, the one component missing one per ADR 0002's convention.

See [ADR 0024](../docs/adr/0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md) for the full write-up.
