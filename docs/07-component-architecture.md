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

### Breadcrumbs

`breadcrumbs/breadcrumbs.tsx` — Page hierarchy trail (`.breadcrumbs`). Sub-components: `BreadcrumbsList` (`<ul>`), `BreadcrumbsItem` (`<li>`). Built and tested, but not yet wired into any live page — the site's routes are still flat (`/about`, `/experience`, `/projects`, `/skills`, `/experiments`), so there's nowhere a trail would show more than one meaningful level. See the `BreadcrumbTrail` Pattern below and [ADR 0030](./adr/0030-daisyui-expansion-phase-3-availability-timeline-breadcrumbs.md).

### Button

`button/button.tsx` — Primary interactive element. Supports all DaisyUI button variants: `primary`, `secondary`, `accent`, `ghost`, `link`, `outline`, `dash`, `soft`. Accepts `size`, `loading`, `disabled`, and all native `<button>` attributes.

### Card

`card/card.tsx` — Content container with optional header, body, and actions (`.card`). Sub-components: `CardContent`, `CardTitle`, `CardDescription`, `CardFooter`, `CardImage`.

### ChatBubble

`chat-bubble/chat-bubble.tsx` — One conversation message (`.chat`). Sub-components: `ChatBubbleImage`, `ChatBubbleHeader`, `ChatBubbleMessage` (accepts a `color` variant), `ChatBubbleFooter`. `placement` prop selects `chat-start`/`chat-end`. Used by the `ChatMessageRow` Pattern for testimonials. See [ADR 0029](./adr/0029-daisyui-expansion-phase-2-matrix-testimonials-mockups.md).

### Container

`container/container.tsx` — Layout max-width wrapper. Constrains content to the design system's responsive breakpoints.

### Countdown

`countdown/countdown.tsx` — A single digit group rendered via DaisyUI's `countdown` class + `--value` CSS variable, using an `<output>` element (not a bare `<span>`) so `aria-label` is valid ARIA — a plain `<span>`'s implicit `role=generic` doesn't support it. Renders a static snapshot; does not tick on its own (a live-updating timer needs a `"use client"` interval loop, out of scope for its current use — see `AvailabilityBanner` below). See [ADR 0030](./adr/0030-daisyui-expansion-phase-3-availability-timeline-breadcrumbs.md).

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

### MockupBrowser

`mockup-browser/mockup-browser.tsx` — Browser-chrome frame (`.mockup-browser`), sibling to `MockupWindow`. `MockupBrowserToolbar` accepts a `url` prop, rendered inside the toolbar's `input`-styled address bar. See [ADR 0029](./adr/0029-daisyui-expansion-phase-2-matrix-testimonials-mockups.md).

### MockupCode

`mockup-code/mockup-code.tsx` — Code-editor-style frame (`.mockup-code`). `MockupCodeLine` accepts a `prefix` prop (e.g. `"$"`) rendered via `data-prefix`. Not yet wired into a live Block — needs a content type carrying actual code text, a genuinely different shape from the image-based mockups. See [ADR 0029](./adr/0029-daisyui-expansion-phase-2-matrix-testimonials-mockups.md).

### MockupPhone

`mockup-phone/mockup-phone.tsx` — iPhone-style frame (`.mockup-phone`). Sub-components: `MockupPhoneCamera`, `MockupPhoneDisplay`. See [ADR 0029](./adr/0029-daisyui-expansion-phase-2-matrix-testimonials-mockups.md).

### MockupWindow

`mockup-window/mockup-window.tsx` — Generic bordered window frame for content previews (`.mockup-window`). Sub-component: `MockupWindowBody`.

### Modal

`modal/modal.tsx` — Dialog overlay with backdrop (`.modal`). Uses a `<dialog>` element for native accessibility.

### Page

`page/page.tsx` — Full viewport layout wrapper. Establishes the app shell grid.

### Progress

`progress/progress.tsx` — Horizontal progress bar. Hand-rolled with `motion/react` (shimmer sweep + spring width animation), not DaisyUI's native `.progress` class — accepts `count` (0–100). See `RadialProgress` below for the sibling ring variant.

### RadialProgress

`radial-progress/radial-progress.tsx` — Circular progress ring using DaisyUI's native `radial-progress` class + `--value` CSS variable (a static ring, not animated like `Progress`). Accepts `count` (0–100). Used by `PanelShowcaseWithRadialProgress` via the `IconRadialProgressRow` Pattern. See [ADR 0028](./adr/0028-daisyui-expansion-footer-radial-carousel.md).

### Skeleton

`skeleton/skeleton.tsx` — Loading placeholder with animated shimmer (`.skeleton`). Shapes via `className` for custom layouts.

### Stat

`stat/stat.tsx` — Statistic display block (`.stat`). Composes `StatTitle`, `StatValue`, `StatDesc`, `StatFigure`.

### Status

`status/status.tsx` — Small colored status dot (`.status`, via DaisyUI's `status` class), e.g. "open to work". Always renders with `role="img"`; when given an `aria-label` it's announced as a named image, and when not it defaults to `aria-hidden="true"` automatically rather than rendering as an unlabeled image (a real, distinct axe violation an early version of this element actually hit — see [ADR 0030](./adr/0030-daisyui-expansion-phase-3-availability-timeline-breadcrumbs.md)).

### Step

`step/step.tsx` — Step indicator within a multi-step flow (`.step`, `.steps`).

### Swap

`swap/swap.tsx` — Animated toggle between two children (`.swap`). Used for theme toggle icons.

### Table

`table/table.tsx` — Dense tabular layout (`.table`), wrapped in the `overflow-x-auto` div DaisyUI's own docs recommend. Sub-components: `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell`. Used by `PanelShowcase`'s `SkillsMatrix` layout. See [ADR 0029](./adr/0029-daisyui-expansion-phase-2-matrix-testimonials-mockups.md).

### Tabs

`tabs/tabs.tsx` — Tab navigation bar (`.tabs`). Composes `Tab` and `TabContent` sub-components.

### Timeline

`timeline/timeline.tsx` — Native DaisyUI timeline spine (`.timeline`), a genuinely different rendering from the Step-primitive-based `TimelineSection`/`TimelineEntry` below. Sub-components: `TimelineItem`, `TimelineStart`, `TimelineMiddle`, `TimelineEnd`. `direction` prop selects `timeline-vertical`/`timeline-horizontal`. Used by `ProcessSteps`'s `WithTimeline` layout. See [ADR 0030](./adr/0030-daisyui-expansion-phase-3-availability-timeline-breadcrumbs.md).

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

`motion-stagger/motion-stagger.tsx` — Staggered entry animations for lists of children (`MotionStaggerContainer` + `MotionStaggerItem`). Each child fades/slides/scales in independently as it enters the viewport, not all at once with its container.

### MotionTextWriter

`motion-text-writer/motion-text-writer.tsx` — Typewriter effect that renders text character-by-character on mount.

### MotionWrapper

`motion-wrapper/motion-wrapper.tsx` — General-purpose animation boundary. Accepts a named animation variant string (e.g., `"fade-up"`, `"zoom-in"`) and applies the corresponding `motion` animation. Blocks and Patterns request animations by name, never by raw Framer Motion variant objects.

---

## Layer 2 — Patterns

Located at `src/components/patterns/`.

### BreadcrumbTrail

`breadcrumb-trail/` — Composes `Breadcrumbs` with `next/link` (not `IconLink` — that's built for icon-only, `target="_blank"` external social links, the wrong shape for in-app navigation). Every item but the last links out; the last renders as `<span aria-current="page">`, optionally with an icon. See [ADR 0030](./adr/0030-daisyui-expansion-phase-3-availability-timeline-breadcrumbs.md).

**Props:**
- `items: { href: string; label: string; icon?: IconProps }[]`

### ChatMessageRow

`chat-message-row/` — One testimonial/quote row: optional `Avatar`+`AvatarImage`, author, message, optional meta line (role/company/timestamp), built on `ChatBubble`. Used by `TestimonialWall`.

**Props:**
- `author: string`
- `message: string`
- `meta?: string`
- `avatarSrc?: string`
- `avatarAlt?: string`

### CountdownUnit

`countdown-unit/` — One digit group + its unit label (e.g. "15" over "Days"), built on `Countdown`. Used by `AvailabilityBanner`.

**Props:**
- `value: number`
- `label: string`

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

`icon-progress-row/` — A row combining an icon cluster and a linear `Progress` bar. Used for skill proficiency displays.

**Props:**
- `progress: number` (0–100)
- `label?: string` — accessible name for the progress bar

### IconRadialProgressRow

`icon-radial-progress-row/` — Exact structural mirror of `IconProgressRow`, swapping the linear `Progress` element for `RadialProgress`. Used by `PanelShowcaseWithRadialProgress`.

**Props:**
- `progress: number` (0–100)
- `label?: string`

### MediaCard

`media-card/` — A generic card that pairs optional media (image/icon) with title and description text. Driven by `size` and `layout` variants instead of domain-specific props.

**Props:**
- `title: string`
- `description?: string`
- `imageSrc?: string`
- `imageAlt?: string`
- `iconCode?: string`
- `layout?: "vertical" | "horizontal"`

### MockupShowcaseFrame

`mockup-showcase-frame/` — Picks the right `Mockup*` Element shell (`browser`, `code`, `phone`, or `window`, the default) based on a `variant` prop, so a Block doesn't have to branch on mockup type itself. `"window"` reuses the existing `MockupWindow` Element rather than adding a fourth near-duplicate. Used by `MockupGallery`. See [ADR 0029](./adr/0029-daisyui-expansion-phase-2-matrix-testimonials-mockups.md).

**Props:**
- `variant?: "browser" | "code" | "phone" | "window"`

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

### StatusIndicator

`status-indicator/` — A `Status` dot (marked `aria-hidden`, since the visible text already carries the meaning) + its text label, e.g. "Open to new roles". Used by `AvailabilityBanner`.

**Props:**
- `label: string`
- `color?: StatusColor`

### TechBadgeCloud

`tech-badge-cloud/` — A wrapped row of icon + label badges (built on `Badge` + `Icon`), e.g. a tech-stack list. Used directly by `TimelineEntry`'s badges meta row (see below), and CMS-driven at the Block layer via `ContentList` (`ui: "TechBadgeCloud"`) — that registration still lives in `blocks/tech-badge-cloud/tech-badge-cloud.adapter.ts`, which imports this Pattern's component rather than owning a duplicate one. Moved here from the Block layer in [ADR 0026](./adr/0026-timeline-tech-badges-meta-row.md) after a Pattern (`TimelineEntry`) needed it and importing a Block from a Pattern would have violated the layer dependency rule.

**Props:**
- `items: { label: string; icon?: IconProps }[]`

### ThemeToggle

`theme-toggle/` — DaisyUI theme switcher using the `Dropdown` element. Reads available themes from Contentful `Layout` data.

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

### AvailabilityBanner

`availability-banner/` — A `StatusIndicator` + optional `CountdownUnit` ("Available in 15 Days"), built on the same `ContentSection` adapter input shape as `AnnouncementBanner`. The countdown, when present, reuses `AdaptedContentItem.startDate` (already fetched for other purposes) computed at render time — not a live-ticking timer. CMS-driven via `ContentSection` (`ui: "AvailabilityBanner"`). See [ADR 0030](./adr/0030-daisyui-expansion-phase-3-availability-timeline-breadcrumbs.md).

**Props:**
- `message: string`
- `statusColor?: StatusColor` — derived from the entry's first matching tag
- `daysUntil?: number` — omitted once `startDate` has passed

### BottomDock

`bottom-dock/` — Mobile-first bottom navigation dock. Shows primary navigation links as icon-only dock items on small screens.

### CardGrid

`card-grid/` — Responsive grid of `MediaCard` patterns. Supports animated card entry via `MotionStagger`. CMS-driven via `ContentList` (`ui: "CardGrid"`), sourcing each card's thumbnail from `customEntries[i].image`.

### Carousel

`carousel/` — A DaisyUI native scroll-snap carousel (`.carousel`) of image slides with a title/description/link overlay. CMS-driven via `ContentList` (`ui: "Carousel"`), sourcing each slide's large image from `customEntries[i].coverImage` — deliberately not `.image`, which `CardGrid` already claims for its thumbnails. See [ADR 0028](./adr/0028-daisyui-expansion-footer-radial-carousel.md).

**Props:**
- `slides: { id?: string; title: string; description?: string; imageSrc: string; imageAlt: string; imageWidth: number; imageHeight: number; links?: AdaptedLink[] }[]`

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

### MockupGallery

`mockup-gallery/` — Each `customEntries[i].image` (same field `CardGrid` uses) framed inside the right `MockupShowcaseFrame`, one frame type per Block instance. CMS-driven via `ContentList`, as **two** `ui` values sharing one component: `"MockupGalleryBrowser"` and `"MockupGalleryPhone"` — a block-level, not per-item, frame choice, deliberately avoiding a second live-schema-field cycle a per-item choice would have needed. See [ADR 0029](./adr/0029-daisyui-expansion-phase-2-matrix-testimonials-mockups.md).

**Props:**
- `frame: "browser" | "phone"`
- `items: { id?: string; title: string; description?: string; imageSrc: string; imageAlt: string; imageWidth: number; imageHeight: number; links?: AdaptedLink[] }[]`

### NotFound

`not-found/` — 404 error page layout. Displays a friendly message with a home navigation link.

### PageWrapper

`page-wrapper/` — Global page layout wrapper that establishes the app shell: sidebar + main content area. Wraps `SidebarNav` and the page content slot.

### PanelShowcase

`panel-showcase/` — Tabbed skills panel: each panel groups a heading + rows of `subItems` data (icon cluster + proficiency indicator). CMS-driven via `ContentList`, as **three** `ui` values sharing one component, all reading the identical `subItems` data (title/progress/icons per row) and differing only in render:

- `ui: "PanelShowcase"` (`adaptPanelShowcase`) — the original grid of rows, each a linear `Progress` bar (`IconProgressRow`).
- `ui: "PanelShowcaseWithRadialProgress"` (`adaptPanelShowcaseWithRadialProgress`) — same rows, each a `RadialProgress` ring (`IconRadialProgressRow`) instead. See [ADR 0028](./adr/0028-daisyui-expansion-footer-radial-carousel.md).
- `ui: "SkillsMatrix"` (`adaptSkillsMatrix`) — all panels flattened into one dense `Table` (Category / Skill / Proficiency) instead of the per-panel grid. See [ADR 0029](./adr/0029-daisyui-expansion-phase-2-matrix-testimonials-mockups.md).

**Props:**
- `panels: { title: string; headingIcon: IconProps; rows: { label: string; progress: number; icons: IconProps[]; variant?: "linear" | "radial" }[] }[]`
- `layout?: "panels" | "table"`

### ProcessSteps

`process-steps/` — A vertical numbered/iconed process (built on the `Step` element family), e.g. "how I approach a project". CMS-driven via `ContentList`, as two `ui` values sharing one component and the same entry-ordered step data:

- `ui: "ProcessSteps"` (`adaptProcessSteps`) — the original numbered `Step` list, falling back to a numbered indicator when no icon is given.
- `ui: "ProcessStepsWithTimeline"` (`adaptProcessStepsWithTimeline`) — the same steps rendered on a native DaisyUI `Timeline` instead. See [ADR 0030](./adr/0030-daisyui-expansion-phase-3-availability-timeline-breadcrumbs.md).

**Props:**
- `steps: { title: string; description?: string; icon?: IconProps }[]`
- `layout?: "steps" | "timeline"`

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

### TestimonialWall

`testimonial-wall/` — Repeated `ChatMessageRow`s, e.g. client/colleague quotes. CMS-driven via `ContentList` (`ui: "TestimonialWall"`), reusing the generic `ContentItem` shape the same way `TimelineSection` reuses it for job entries: `title` → author, `subtitle` → meta (role/company), **`description` → quote** (plain string) — deliberately not `body` (rich text), keeping the `ChatMessageRow` Pattern's `message` prop a simple string rather than pulling rich-text rendering into a Pattern that doesn't need it. See [ADR 0029](./adr/0029-daisyui-expansion-phase-2-matrix-testimonials-mockups.md).

**Props:**
- `testimonials: ChatMessageRowProps[]`

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
| `ContentSection` (single entry) | `HeroBanner`, `SplitContentPanel`, `AnnouncementBanner`, `AvailabilityBanner` |
| `ContentList` (multiple entries) | `TimelineSection`, `TimelineSectionWithBadges`, `SplitContentPanel`, `CardGrid`, `Carousel`, `MockupGalleryBrowser`, `MockupGalleryPhone`, `PanelShowcase`, `PanelShowcaseWithRadialProgress`, `SkillsMatrix`, `FaqAccordion`, `MetricsStrip`, `ProcessSteps`, `ProcessStepsWithTimeline`, `ContentTabs`, `TechBadgeCloud`, `TestimonialWall` |

Adding a new CMS-toggleable Block is a registry entry plus a `setup-content-model.ts` enum value (and a
live `pnpm contentful:setup` push before an editor can actually select it) — not new component work, if a
suitable Block already exists, or a new same-data variant of one (the `WithRadialProgress`/`SkillsMatrix`/
`WithTimeline`/`MockupGallery*` pattern above). See [ADR 0024](./adr/0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md)
for the original registry expansion and [ADRs 0028–0030](./adr/0028-daisyui-expansion-footer-radial-carousel.md)
for the DaisyUI-catalog-driven expansion that added everything from `Carousel` onward.

A `Footer` Block existed briefly in this catalog (ADR 0028) and was removed after review — `layout.footerText`
is fetched and adapted but currently rendered nowhere in the app, a known, deliberate gap, not an oversight.

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
