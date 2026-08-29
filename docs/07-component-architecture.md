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

### ThemeToggle

`theme-toggle/` — DaisyUI theme switcher using the `Swap` element. Reads available themes from Contentful `Layout` data.

### TimelineEntry

`timeline-entry/` — A single vertical timeline entry with date range, title, subtitle, body, and optional tech badge chips.

**Props:**
- `title: string`
- `subtitle?: string`
- `startDate?: string`
- `endDate?: string`
- `body?: Document` (Rich Text)
- `tags?: string[]`
- `iconCode?: string`

---

## Layer 3 — Blocks

Located at `src/components/blocks/`.

### AppHeader

`app-header/` — Global top navigation bar. Contains logo, navigation links, theme toggle, and resume download action. Completely driven by `Layout` adapter data.

**Layer contract:** `AppHeaderProps` — plain TypeScript, no Contentful types.

### BottomDock

`bottom-dock/` — Mobile-first bottom navigation dock. Shows primary navigation links as icon-only dock items on small screens.

### CardGrid

`card-grid/` — Responsive grid of `MediaCard` patterns. Supports animated card entry via `MotionStagger`.

### HeroBanner

`hero-banner/` — Full-width hero section. Displays avatar, banner image, animated text, and social links.

**Animation:** Uses `MotionWrapper` with `"fade-up"` variant for entry animation.

### NotFound

`not-found/` — 404 error page layout. Displays a friendly message with a home navigation link.

### PageWrapper

`page-wrapper/` — Global page layout wrapper that establishes the app shell: sidebar + main content area. Wraps `SidebarNav` and the page content slot.

### PanelShowcase

`panel-showcase/` — Tabbed panel display. Each tab reveals a different `MediaCard` or content panel.

### ServerError

`server-error/` — 500 error page layout with refresh action.

### SidebarNav

`sidebar-nav/` — Left navigation panel with `NavItem` list. Collapses to a `Drawer` on mobile.

### SplitContentPanel

`split-content-panel/` — Side-by-side layout with text on one side and media on the other. Reversible via `reversed` prop. Used for about/bio sections.

**Props:**
- `title: string`
- `body?: Document`
- `imageSrc?: string`
- `imageAlt?: string`
- `reversed?: boolean`

### TimelineSection

`timeline-section/` — Full vertical timeline section heading + list of `TimelineEntry` patterns.

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
