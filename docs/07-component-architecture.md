# Chapter 07 — Component Architecture

This chapter provides a comprehensive catalog of every component in the three-layer system, its folder path, purpose, and key props.

For the architectural rationale, see [Chapter 03 — Architecture](./03-architecture.md).

---

## Layer 1 — UI Elements

Located at `src/components/elements/ui/`. Each element wraps a DaisyUI component class.

### Accordion

`accordion/accordion.tsx` — Collapsible content sections using `.accordion` / `.collapse` DaisyUI classes.

### Alert

`alert/alert.tsx` — Notification banners for info, success, warning, and error states (`.alert`).

### Avatar

`avatar/avatar.tsx` — Profile image display with optional badge and status ring (`.avatar`).

### Badge

`badge/badge.tsx` — Compact tag/label displays supporting size and color variants (`.badge`).

### Button

`button/button.tsx` — Primary interactive element. Supports all DaisyUI button variants: `primary`, `secondary`, `accent`, `ghost`, `link`, `outline`, `dash`, `soft`. Accepts `size`, `loading`, `disabled`, and all native `<button>` attributes.

### Card

`card/card.tsx` — Content container with optional header, body, and actions (`.card`). Sub-components: `CardBody`, `CardTitle`, `CardActions`.

### Container

`container/container.tsx` — Layout max-width wrapper. Constrains content to the design system's responsive breakpoints.

### Divider

`divider/divider.tsx` — Visual separator with optional label text (`.divider`).

### Dock

`dock/dock.tsx` — Bottom navigation bar for mobile layouts (`.dock`). Houses `DockItem` sub-components.

### Drawer

`drawer/drawer.tsx` — Side panel overlay with open/close state management (`.drawer`). Exposes `DrawerProvider` context and `useDrawer()` hook for child components.

### Dropdown

`dropdown/dropdown.tsx` — Context-menu-style dropdown using the `useDrawer()` context to coordinate open state (`.dropdown`).

### Icon

`icon/icon.tsx` — Resolves a Contentful icon identifier (e.g., `"fa/FaGithub"`) through the **Curated Static Icon Registry** and renders the corresponding `react-icons` component. Falls back gracefully for unknown identifiers.

**Registry approach:** Only explicitly registered icons are bundled. This reduces first-load JS from 575 kB to ~173 kB via tree-shaking. See [ADR 0016](./adr/0016-curated-static-icon-registry.md).

### Kbd

`kbd/kbd.tsx` — Renders keyboard key labels (`.kbd`).

### Loading

`loading/loading.tsx` — Animated loading spinner (`.loading`). Supports `size` and `variant` (`spinner`, `dots`, `ring`, `bars`, `ball`, `infinity`).

### Menu

`menu/menu.tsx` — Vertical or horizontal navigation list (`.menu`). Composes `MenuItem` and `MenuTitle` sub-components.

### MockupWindow

`mockup-window/mockup-window.tsx` — macOS-style window frame for code/UI previews (`.mockup-window`).

### Modal

`modal/modal.tsx` — Dialog overlay with backdrop (`.modal`). Uses a `<dialog>` element for native accessibility.

### Page

`page/page.tsx` — Full viewport layout wrapper. Establishes the app shell grid.

### Progress

`progress/progress.tsx` — Horizontal progress bar (`.progress`). Accepts `value` (0–100) and `color` variant.

### Skeleton

`skeleton/skeleton.tsx` — Loading placeholder with animated shimmer (`.skeleton`). Shapes via `className` for custom layouts.

### Stat

`stat/stat.tsx` — Statistic display block (`.stat`). Composes `StatTitle`, `StatValue`, `StatDesc`, `StatFigure`.

### Step

`step/step.tsx` — Step indicator within a multi-step flow (`.step`, `.steps`).

### Swap

`swap/swap.tsx` — Animated toggle between two children (`.swap`). Used for theme toggle icons.

### Tabs

`tabs/tabs.tsx` — Tab navigation bar (`.tabs`). Composes `Tab` and `TabContent` sub-components.

### Tooltip

`tooltip/tooltip.tsx` — Hover tooltip wrapper (`.tooltip`). Accepts `tip` content and `position` variant.

---

## Layer 1 — Behavioral Elements

Located at `src/components/elements/behavior/`. All are `"use client"` components.

### FrozenRouter

`frozen-router/frozen-router.tsx` — Freezes Next.js router navigation during exit animations, preventing flicker when route transitions occur.

### MotionDraggable

`motion-draggable/motion-draggable.tsx` — Makes children draggable within defined constraints using Motion's drag API.

### MotionHover

`motion-hover/motion-hover.tsx` — Applies spring-physics hover interactions (scale, lift, shadow) to children.

### MotionParallax

`motion-parallax/motion-parallax.tsx` — Scroll-driven parallax effect. Children translate at a configurable speed relative to scroll position.

### MotionProvider

`motion-provider/motion-provider.tsx` — Root `LazyMotion` provider. Required for all `motion/react` `m.*` components to function. Wraps the entire app in `app/layout.tsx` and globally in Storybook preview.

### MotionScrollProgress

`motion-scroll-progress/motion-scroll-progress.tsx` — Scroll progress indicator bar that grows as the user scrolls down the page.

### MotionStagger

`motion-stagger/motion-stagger.tsx` — Staggered entry animations for lists of children. Each child fades/slides in with a configurable delay between items.

### MotionTextWriter

`motion-text-writer/motion-text-writer.tsx` — Typewriter effect that renders text character-by-character on mount.

### MotionWrapper

`motion-wrapper/motion-wrapper.tsx` — General-purpose animation boundary. Accepts a named animation variant string (e.g., `"fade-up"`, `"zoom-in"`) and applies the corresponding `motion` animation. Blocks and Patterns request animations by name, never by raw Framer Motion variant objects.

---

## Layer 2 — Patterns

Located at `src/components/patterns/`.

### IconCluster

`icon-cluster/` — Displays a grouped grid of icons. Used for technology stacks, skills, etc.

**Props:**
- `icons: { code: string; label?: string }[]`
- `size?: "sm" | "md" | "lg"`

### IconLink

`icon-link/` — A hyperlink presented visually as an icon. Used for social links.

**Props:**
- `href: string`
- `iconCode: string` — resolved via the Icon Registry
- `label: string` — accessible label
- `external?: boolean` — adds `rel="noopener"` and `target="_blank"`

### IconProgressRow

`icon-progress-row/` — A row combining an icon, label text, and a progress bar. Used for skill proficiency displays.

**Props:**
- `iconCode: string`
- `label: string`
- `progress: number` (0–100)

### MediaCard

`media-card/` — A generic card that pairs optional media (image/icon) with title and description text. Driven by `size` and `layout` variants instead of domain-specific props.

**Props:**
- `title: string`
- `description?: string`
- `imageSrc?: string`
- `imageAlt?: string`
- `iconCode?: string`
- `layout?: "vertical" | "horizontal"`

### NavItem

`nav-item/` — A navigation link with an icon and label. Used inside `SidebarNav` and `AppHeader`.

**Props:**
- `href: string`
- `label: string`
- `iconCode?: string`
- `active?: boolean`

### PageNavButton

`page-nav-button/` — Previous/next page navigation arrows typically used at the bottom of content pages.

### RichText

`rich-text/` — Renders Contentful Rich Text (`Document`) content using `@contentful/rich-text-react-renderer`. Maps Rich Text node types to semantic HTML elements and DaisyUI classes.

### SectionHeading

`section-heading/` — Titled section header with optional subtitle and decorative element.

**Props:**
- `title: string`
- `subtitle?: string`
- `align?: "left" | "center" | "right"`

### StatGroup

`stat-group/` — A group of statistics. Supports `direction="row|col"` for layout orientation.

**Props:**
- `stats: { label: string; value: string; description?: string }[]`
- `direction?: "row" | "col"`

### TechBadgeCloud

`tech-badge-cloud/` — A wrapped row of icon + label badges (built on `Badge` + `Icon`), e.g. a tech-stack list. Used directly by `TimelineEntry`'s badges meta row (see below), and CMS-driven at the Block layer via `ContentList` (`ui: "TechBadgeCloud"`) — that registration still lives in `blocks/tech-badge-cloud/tech-badge-cloud.adapter.ts`, which imports this Pattern's component rather than owning a duplicate one. Moved here from the Block layer in [ADR 0026](./adr/0026-timeline-tech-badges-meta-row.md) after a Pattern (`TimelineEntry`) needed it and importing a Block from a Pattern would have violated the layer dependency rule.

**Props:**
- `items: { label: string; icon?: IconProps }[]`

### ThemeToggle

`theme-toggle/` — DaisyUI theme switcher using the `Swap` element. Reads available themes from Contentful `Layout` data.

### TimelineEntry

`timeline-entry/` — A single vertical timeline entry with date range, title, subtitle, body, and meta rows. Each meta row is either the default icon + text line, or (since [ADR 0026](./adr/0026-timeline-tech-badges-meta-row.md)) a `TechBadgeCloud` — used for a tech-stack row so each skill can carry its own icon instead of being flattened into one comma-joined string.

**Props:**
- `title: string`
- `indicatorIcon?: IconProps`
- `body: ReactNode`
- `metaRows: TimelineEntryMetaRow[]` — a union of:
  - `{ icon: IconProps; text: string; type?: "text" }` (default)
  - `{ items: TechBadgeCloudItem[]; type: "badges" }` — renders as a bare `TechBadgeCloud`, no separate icon/label heading (the badges already carry their own icon + label each, so a "Tech Stack" caption above them was redundant)

---

## Layer 3 — Blocks

Located at `src/components/blocks/`.

### AnnouncementBanner

`announcement-banner/` — A dismissible-style banner (built on the `Alert` element) for site-wide notices, e.g. "open to work". CMS-driven via `ContentSection` (`ui: "AnnouncementBanner"`).

**Props:**
- `message: string`
- `variant?: "info" | "success" | "warning" | "error"` — derived from the entry's first matching tag
- `icon?: IconProps`
- `link?: AdaptedLink` — optional CTA

### AppHeader

`app-header/` — Global top navigation bar. Contains logo, navigation links, theme toggle, and resume download action. Completely driven by `Layout` adapter data.

**Layer contract:** `AppHeaderProps` — plain TypeScript, no Contentful types.

### BottomDock

`bottom-dock/` — Mobile-first bottom navigation dock. Shows primary navigation links as icon-only dock items on small screens.

### CardGrid

`card-grid/` — Responsive grid of `MediaCard` patterns. Supports animated card entry via `MotionStagger`.

### ContentTabs

`content-tabs/` — Client-side tabbed rich-text content (built on the `Tabs`/`Tab` elements). Distinct from `PanelShowcase`, which pairs tabs with `MediaCard` media; this is plain text-only tabs. CMS-driven via `ContentList` (`ui: "ContentTabs"`).

**Props:**
- `tabs: { label: string; content: Document }[]`

### FaqAccordion

`faq-accordion/` — A list of question/answer pairs (built on the `Accordion`/`AccordionItem` elements). CMS-driven via `ContentList` (`ui: "FaqAccordion"`).

**Props:**
- `items: { question: string; answer: Document }[]`

### HeroBanner

`hero-banner/` — Full-width hero section. Displays avatar, banner image, animated text, and social links.

**Animation:** Uses `MotionWrapper` with `"fade-up"` variant for entry animation.

### MetricsStrip

`metrics-strip/` — A row of `StatGroup` cards (a label + big value + optional icon each), e.g. "5+ Years experience". CMS-driven via `ContentList` (`ui: "MetricsStrip"`).

**Props:**
- `stats: StatGroupProps[]`

### NotFound

`not-found/` — 404 error page layout. Displays a friendly message with a home navigation link.

### PageWrapper

`page-wrapper/` — Global page layout wrapper that establishes the app shell: sidebar + main content area. Wraps `SidebarNav` and the page content slot.

### PanelShowcase

`panel-showcase/` — Tabbed panel display. Each tab reveals a different `MediaCard` or content panel.

### ProcessSteps

`process-steps/` — A vertical numbered/iconed process (built on the `Step` element family), e.g. "how I approach a project". CMS-driven via `ContentList` (`ui: "ProcessSteps"`).

**Props:**
- `steps: { title: string; description?: string; icon?: IconProps }[]` — rendered in entry order, falling back to a numbered indicator when no icon is given

### ServerError

`server-error/` — 500 error page layout with refresh action.

### SidebarNav

`sidebar-nav/` — Left navigation panel with `NavItem` list. Collapses to a `Drawer` on mobile.

### SplitContentPanel

`split-content-panel/` — A rich-text block paired with a row of `StatGroup` info cards. Used for about/bio sections.

**Props:**
- `description?: Document` — rich-text body
- `infoRows: StatGroupProps[]` — e.g. Location, Experience, Availability

**CMS-driven two ways**, via two distinct adapters in `split-content-panel.adapter.ts` (the two registries feed it structurally different data, so each earned its own adapter rather than forcing one shape through the other):
- `ContentList` (`ui: "SplitContentPanel"`, the original path) — `description` comes from the list's own top-level rich-text field, `infoRows` from its `customEntries`.
- `ContentSection` (`ui: "SplitContentPanel"`, added in [ADR 0024](./adr/0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md)) — `description` comes from the single entry's rich-text `body`, `infoRows` from its `subItems`.

### TimelineSection

`timeline-section/` — Full vertical timeline section heading + list of `TimelineEntry` patterns. The tech-stack meta row is always sourced from `subItems` (flat `tags` are never read for it), but rendered two different ways depending on which `ui` value is selected — each with its own adapter function in `timeline-section.adapter.ts`:
- `ui: "TimelineSection"` (`adaptTimelineSection`) — the original single icon + comma-joined text line, e.g. "React, TypeScript, Node.js".
- `ui: "TimelineSectionWithBadges"` (`adaptTimelineSectionWithBadges`) — the same `subItems` rendered as a `TechBadgeCloud`, each with its own icon.

See [ADR 0026](./adr/0026-timeline-tech-badges-meta-row.md).

---

## CMS Block Registries

Two content types carry a `ui` field an editor picks in Contentful, mapped to a Block by a `Record<string,
...>` registry — `SECTION_BLOCK_REGISTRY` in `content-section.tsx` and `LIST_BLOCK_REGISTRY` in
`content-list.tsx`. An unmapped `ui` value renders `BlockPlaceholder` (visible in development, `null` in
production — see [ADR 0004](./adr/0004-contentful-renderers.md)).

| Content type | Registered `ui` values |
|---|---|
| `ContentSection` (single entry) | `HeroBanner`, `SplitContentPanel`, `AnnouncementBanner` |
| `ContentList` (multiple entries) | `TimelineSection`, `TimelineSectionWithBadges`, `CardGrid`, `PanelShowcase`, `SplitContentPanel`, `FaqAccordion`, `MetricsStrip`, `ProcessSteps`, `ContentTabs`, `TechBadgeCloud` |

Adding a new CMS-toggleable Block is a registry entry plus a `setup-content-model.ts` enum value — not new
component work, if a suitable Block already exists. See [ADR 0024](./adr/0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md).

---

## Generic Composable Variants

Certain Blocks and Patterns were deliberately renamed to remove domain coupling. See [ADR 0008](./adr/0008-generic-composable-component-naming.md).

| Generic Name | Avoided Domain Name |
|-------------|---------------------|
| `SplitContentPanel` | `bio-section`, `profile-banner` |
| `MediaCard` | `project-preview-card`, `experience-card` |
| `IconLink` | `social-link` |
| `StatGroup` | `info-stat-row`, `icon-progress-group` |
| `HeroBanner` | `ProfileBanner` |
| `TimelineSection` | `ExperienceList` |
| `SidebarNav` | `SidebarMenu` |
