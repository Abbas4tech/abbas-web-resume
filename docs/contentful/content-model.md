# Contentful General Content Model

This document serves as the reference for the composable content model used in this application. It defines the structure, fields, and rules for all Content Types in Contentful.

> **Source of truth**: this document is a human-readable mirror of
> [`src/contentful/scripts/setup-content-model.ts`](../../src/contentful/scripts/setup-content-model.ts), which is the
> script that actually creates/updates these content types (`pnpm contentful:setup`). If the two ever disagree, the
> script is correct — treat a mismatch as a bug in this file, not in the script.

## 1. Elements (Atoms)

These are the smallest building blocks, often embedded inside other content types.

### 🖼 Icon (`icon`)
Icon representation, primarily mapping to React-icons.
* **internalName** (Symbol, Required)
* **name** (Symbol, Required): **The human-facing accessible name / tooltip text** (e.g., `Typescript`,
  `Github`) — read by `Icon`'s `data-tip`/`aria-label`. **Not** the react-icon component name, despite an
  earlier version of this doc saying so; see [ADR-0016](../adr/0016-curated-static-icon-registry.md) and
  `src/components/elements/ui/icon/icon-map.ts`'s own `IconProps.name` doc comment, which is authoritative.
* **iconCode** (Symbol): The technical identifier, format `"library/ComponentName"` (e.g. `fa/FaGithub`)
  — this is what `Icon` actually resolves against the curated registry to pick a component to render.
* **showTooltip** (Boolean)
* **library** (Symbol): The icon library (e.g., `fa`, `fi`) — normally redundant with the prefix already
  in `iconCode`, but kept as its own field since some callers pass it explicitly.
* **title** (Symbol): Adapted (`AdaptedIcon.title`) but not currently read by any rendering component —
  reserved/unused today.
* **color** (Symbol): Hex color code.

### 🖼 Image (`image`)
Image assets with metadata and accessibility features.
* **internalName** (Symbol, Required)
* **image** (Asset Link, Required): The actual media file.
* **alternativeText** (Symbol, Required): Alt text for screen readers.
* **caption** (Symbol)

### 🔗 Link (`link`)
Links and navigation items for buttons and CTAs.
* **internalName** (Symbol, Required)
* **text** (Symbol, Required): The visible text of the link.
* **page** (Entry Link to `page`): Internal routing link.
* **url** (Symbol): External URL.

### 🖼 Stat Item (`statItem`)
Lightweight item for stats, tags, and skills. Renamed from the legacy `badge` content type — if you see
`badge` referenced anywhere (older ADRs, old branches), it means `statItem`.
* **internalName** (Symbol, Required)
* **title** (Symbol, Required)
* **icons** (Array of Entry Links to `icon`, max 10)
* **progress** (Integer, 0–100)

---

## 2. Content & Assembly (Molecules & Organisms)

### 📚 Content Item (`contentItem`)
Reusable, flexible content blocks used for experiences, projects, skills, or articles.
* **entryField** (Symbol, Required): Display name.
* **title** (Symbol, Required)
* **subtitle** (Symbol): Used for company names, positions, etc.
* **description** (Text)
* **body** (RichText): The main rich text content.
* **startDate** / **endDate** (Date)
* **image** (Entry Link to `image`): Used by Blocks like `CardGrid` for thumbnails.
* **coverImage** (Entry Link to `image`): Distinct from `image` — used for full-bleed/hero-style media,
  e.g. `Carousel` slides.
* **icon** (Entry Link to `icon`)
* **links** (Array of `link` entries)
* **subItems** (Array of `statItem` entries): For nested items like TechStack in an Experience or
  SkillGroups in a SkillSet.
* **tags** (Array of Symbols): Metadata tags.
* **progress** (Integer, 0–100): A progress value on the item itself, separate from any `subItems`'
  own per-item `progress` (e.g. an overall skill-group completion vs. each skill's own level).

### 💎 Content Section (`contentSection`)
Two-column content layouts, hero areas, or single-entry banners.
* **internalName** (Symbol, Required)
* **ui** (Symbol, Required): The generic UI block mapping. Registered values (see
  `SECTION_BLOCK_REGISTRY` in `src/components/contentful/page-section/content-section.tsx`):
  `HeroBanner`, `SplitContentPanel`, `AnnouncementBanner`, `AvailabilityBanner`. Falls back to
  `HeroBanner` if left blank — see [ADR 0024](../adr/0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md).
  Any other string (including the fixture's intentional `"Marquee"` placeholder) exercises the
  unregistered-`ui` `BlockPlaceholder` dev-mode fallback instead of crashing.
* **entry** (Entry Link to `contentItem` or `statItem`)

### 💎 Content List (`contentList`)
Lists of content items for page layouts.
* **internalName** (Symbol, Required)
* **ui** (Symbol, Required): The generic UI mapping. Registered values (see `LIST_BLOCK_REGISTRY` in
  `src/components/contentful/page-section/content-list.tsx`):
  `TimelineSection`, `TimelineSectionWithBadges`, `SplitContentPanel`, `CardGrid`, `Carousel`,
  `MockupGalleryBrowser`, `MockupGalleryPhone`, `PanelShowcase`, `PanelShowcaseWithRadialProgress`,
  `SkillsMatrix`, `FaqAccordion`, `MetricsStrip`, `ProcessSteps`, `ProcessStepsWithTimeline`,
  `ContentTabs`, `TechBadgeCloud`, `TestimonialWall`. Falls back to `CardGrid` if left blank — see
  [ADR 0024](../adr/0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md). Several of
  these pairs (`TimelineSection`/`WithBadges`, `PanelShowcase`/`WithRadialProgress`/`SkillsMatrix`,
  `ProcessSteps`/`WithTimeline`) are rendered by the **same component** selected via a `layout`/data
  prop, not separate components — see
  [`docs/07-component-architecture.md`](../07-component-architecture.md) for the full Block catalog.
* **title** / **description** (Symbol / RichText)
* **entries** (Symbol, Required): The category of entries to fetch — one of `Articles`, `Products`,
  `Collections`, `Custom`, `Experience`, `Skills`, `Projects`.
* **customEntries** (Array of `contentItem` entries): Manual override array, used when `entries` is
  `Custom` (e.g. `Carousel` slides, `TestimonialWall` quotes).

---

## 3. Global & Routing (Templates & Pages)

### 📜 Page (`page`)
Main page definitions that map to URL routes.
* **internalName** (Symbol, Required)
* **path** (Symbol, Required, Unique): The URL path (e.g., `/`, `/about`).
* **title** (Symbol, Required)
* **description** (RichText): Page description, rendered below the section heading.
* **icon** (Entry Link to `icon`)
* **topContentArea** (Array of `contentList`/`contentSection`, max 10): Components rendered at the top
  of the page.
* **bottomContentArea** (Array of `contentList`/`contentSection`, max 8): Components rendered at the
  bottom.
* **seo** (Entry Link to `seoMetadata`): Per-page SEO override.

### ⚙️ Layout (`layout`)
Site-wide configuration (formerly `AppData`).
* **internalName** / **title** (Symbol, Required)
* **role** (Symbol)
* **resume** (Asset Link): Downloadable resume file.
* **globalSeo** (Entry Link to `seoMetadata`): Site-wide SEO fallback, distinct from each page's own
  `seo` link.
* **defaultTheme** (Symbol): One of the DaisyUI theme names in the script's `DAISY_THEMES` list.
* **themeList** (Array of Symbols, each constrained to `DAISY_THEMES`): The themes exposed in the
  theme switcher.
* **siteLogo** (Entry Link to `image`) — **not** `logo`; an earlier version of this doc used the wrong
  field name.
* **email** / **footerText** (Symbol)
* **resumeIcon** / **themeIcon** (Entry Link to `icon`)
* **drawerVariant** (Symbol): `default` or `dock-on-mobile`.
* **drawerSide** (Symbol): `left` or `right`.
* **navigationLinks** (Array of Entry Links to `link`) — see
  [ADR 0009](../adr/0009-navigation-links-array.md).

> **Note on `favicon`**: there is no `layout.favicon` field in the current schema — it was migrated
> onto each page's `seoMetadata.favicon` and then removed from `layout` via
> `src/contentful/scripts/migrate-favicon-to-seo.ts` (omit-then-delete). See
> [ADR 0031](../adr/0031-contentful-schema-parity-verification.md)'s amendment for the incident that
> depended on this field existing consistently per-environment.

### 🔍 SEO Metadata (`seoMetadata`)
Reusable Next.js SEO metadata configuration, linked from both `layout.globalSeo` and `page.seo`.
* **internalName** (Symbol, Required)
* **title** (Symbol)
* **description** (Text)
* **keywords** (Array of Symbols)
* **siteName** (Symbol)
* **publisher** (Symbol)
* **creator** (Symbol)
* **countryName** (Symbol)
* **canonicalUrl** (Symbol, must match `^(http|https)://.*`)
* **noIndex** / **noFollow** (Boolean)
* **ogImage** (Entry Link to `image`)
* **favicon** (Asset Link): Per-page/global favicon override — see the note under `layout` above for
  why this field lives here and not on `layout`.
