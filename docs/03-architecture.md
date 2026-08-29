# Chapter 03 — Architecture

This chapter describes the high-level system architecture: how data flows from Contentful to the browser, and how the three-layer component system is structured.

---

## System Overview

```
Contentful CMS
    │  GraphQL (via graphql-request)
    ▼
Next.js Server Component (page.tsx / layout.tsx)
    │  calls adapter functions
    ▼
Contentful Renderers (src/components/contentful/)
    │  maps AdaptedContentList / AdaptedContentSection → Blocks
    ▼
Blocks  ←  Patterns  ←  Elements
    │
    ▼
Browser (React DOM)
```

All data fetching happens **on the server**. Client components are restricted to behavioral wrappers (e.g., animations, drawer context).

---

## The Three-Layer Component System

The component architecture is defined by [ADR 0001](./adr/0001-three-layer-component-architecture.md) and enforced by file-system conventions.

```
src/components/
├── elements/         ← Layer 1: Zero domain knowledge
│   ├── ui/           ← DaisyUI wrappers
│   └── behavior/     ← Motion, router, layout helpers
├── patterns/         ← Layer 2: Composed visual structures
├── blocks/           ← Layer 3: Named page-slot compositions
└── contentful/       ← CMS-aware renderers (not a UI layer)
```

### Layer 1 — Elements

The lowest layer. Elements carry **no domain meaning** and **no business logic**.

#### UI Elements (`src/components/elements/ui/`)

Thin wrappers around DaisyUI CSS classes. The component name mirrors the DaisyUI class it wraps.

| Component | DaisyUI Class | Purpose |
|-----------|--------------|---------|
| `Button` | `.btn` | Button variants |
| `Badge` | `.badge` | Tag/label displays |
| `Card` | `.card` | Card container |
| `Modal` | `.modal` | Dialog overlay |
| `Drawer` | `.drawer` | Side panel |
| `Tabs` | `.tabs` | Tab navigation |
| `Avatar` | `.avatar` | Profile images |
| `Progress` | `.progress` | Progress bar |
| `Stat` | `.stat` | Statistic display |
| `Tooltip` | `.tooltip` | Hover tooltip |
| `Accordion` | `.accordion` | Expandable sections |
| `Alert` | `.alert` | Notification banner |
| `Skeleton` | `.skeleton` | Loading placeholder |
| `Loading` | `.loading` | Spinner indicator |
| `Swap` | `.swap` | Toggle between two children |
| `Kbd` | `.kbd` | Keyboard key display |
| `Step` | `.step` | Step indicator |
| `Dock` | `.dock` | Bottom navigation bar |
| `Dropdown` | `.dropdown` | Dropdown menu |
| `Menu` | `.menu` | List navigation |
| `Divider` | `.divider` | Visual separator |
| `Container` | — | Layout max-width wrapper |
| `MockupWindow` | `.mockup-window` | Window frame mockup |
| `Page` | — | Full-page layout wrapper |
| `Icon` | — | Icon registry renderer |

**Rules for UI Elements:**
- Props are HTML-native attributes + `className` only
- No business logic, no domain types
- No adapter needed

#### Behavioral Elements (`src/components/elements/behavior/`)

Styling-agnostic helpers that provide structural, animation, layout, or browser-event capabilities.

| Component | Purpose |
|-----------|---------|
| `MotionWrapper` | `"use client"` boundary; encodes named animation variants |
| `MotionProvider` | Provides `LazyMotion` context for all motion components |
| `MotionParallax` | Scroll-driven parallax wrapper |
| `MotionHover` | Hover interaction with spring physics |
| `MotionDraggable` | Drag-to-reorder wrapper |
| `MotionStagger` | Staggered child entry animations |
| `MotionScrollProgress` | Scroll progress indicator |
| `MotionTextWriter` | Text typewriter effect |
| `FrozenRouter` | Freezes Next.js router during animations |

**Rules for Behavioral Elements:**
- Declare `"use client"` when required
- No DaisyUI class usage
- Expose behavior-specific configuration props only

---

### Layer 2 — Patterns

Compositions of Elements that encode a **reusable visual structure**. Patterns carry no domain meaning and are independently swappable.

| Pattern | Visual Role |
|---------|------------|
| `IconProgressRow` | Row with icon, label, and progress bar |
| `IconCluster` | Grouped icon grid |
| `IconLink` | Hyperlink presented as an icon |
| `MediaCard` | Card pairing media with text |
| `NavItem` | Navigation link with icon and label |
| `PageNavButton` | Previous/next page navigation |
| `RichText` | Contentful Rich Text renderer |
| `SectionHeading` | Titled section header |
| `StatGroup` | Group of statistics |
| `ThemeToggle` | DaisyUI theme switcher |
| `TimelineEntry` | Single entry in a timeline |

**Rules for Patterns:**
- Named after visual structure, not domain content (e.g. `IconProgressRow` not `SkillRow`)
- Props are plain TypeScript — no Contentful-generated types
- Ships with `[name].adapter.ts` — pure function transforming input → Pattern props

---

### Layer 3 — Blocks

Compositions of Patterns and/or Elements that **occupy a named visual slot** in the page layout.

| Block | Visual Slot |
|-------|------------|
| `AppHeader` | Top navigation bar |
| `HeroBanner` | Full-width hero section |
| `SidebarNav` | Left/right navigation panel |
| `BottomDock` | Mobile bottom navigation dock |
| `CardGrid` | Responsive grid of MediaCards |
| `PanelShowcase` | Tabbed panel layout |
| `SplitContentPanel` | Side-by-side text and media |
| `TimelineSection` | Vertical timeline of entries |
| `PageWrapper` | Global page layout wrapper |
| `NotFound` | 404 error page |
| `ServerError` | 500 error page |

**Rules for Blocks:**
- Named after the visual slot, not domain content (e.g. `HeroBanner` not `ProfileBanner`)
- **Never import** from `@/contentful/` or `@/types/entries` in `index.tsx`
- Ships with `[name].adapter.ts` — pure TypeScript, no React

---

## Layer Dependency Rule

```
Elements  ←  Patterns  ←  Blocks  ←  Contentful Renderers  ←  Pages
```

A lower layer **never** imports from a higher layer. Violations are architectural bugs.

---

## Adapter Pattern

Adapters are pure TypeScript functions (`.ts`, not `.tsx`). They are the **only** place that knows about the data source.

```ts
// src/components/blocks/hero-banner/hero-banner.adapter.ts
import type { HeroBannerProps } from "./hero-banner";

export function adaptHeroBanner(raw: RawInput): HeroBannerProps {
  return {
    bannerImageSrc: raw.bannerImage.url,
    bannerImageAlt: raw.bannerImage.title,
    avatarSrc: raw.profilePicture.url,
    // ...
  };
}
```

When the Contentful schema changes, **only the adapter changes**. The Block, its Patterns, and all Elements underneath remain untouched.

---

## Contentful Renderers

`src/components/contentful/` contains CMS-aware components that sit between the adapter layer and the Block layer:

| File | Role |
|------|------|
| `contentful-page.tsx` | Renders a full `AdaptedPage` by composing content areas |
| `contentful-layout.tsx` | Renders the `AdaptedLayout` (global nav, header, theme) |
| `content-list.tsx` | Maps `ui` field → Block component (e.g. `CardGrid`) |
| `content-section.tsx` | Maps `ui` field → Block component (e.g. `HeroBanner`) |
| `content-item.tsx` | Renders a single `AdaptedContentItem` |
| `icon.tsx` | Resolves Contentful icon entries via the Icon Registry |
| `image.tsx` | Renders Contentful image assets with Next.js `<Image>` |
| `link.tsx` | Renders Contentful link entries (internal + external) |
| `stat-item.tsx` | Renders `AdaptedBadge` items as `<Stat>` elements |

---

## Data Flow Example

A request for `/experience` follows this path:

```
1. Next.js App Router matches /experience route
2. app/(app)/experience/page.tsx → fetches AdaptedPage via Contentful GraphQL
3. <ContentfulPage data={adaptedPage} />
4. ContentfulPage loops through topContentArea
5. For each ContentList entry → <ContentList data={item} />
6. ContentList reads item.ui === "Experience Timeline"
7. Renders <TimelineSection entries={item.entries} />
8. TimelineSection composes <TimelineEntry> Patterns
9. TimelineEntry composes <Avatar>, <Badge>, <Progress> Elements
```

---

## File Naming Convention

Every component lives in its own folder. Files must own their namespace explicitly (no `index.tsx`):

```
button/
├── button.tsx          ← Implementation
├── button.stories.tsx  ← Storybook stories
├── button.mock.ts      ← Mock data for stories
└── button.spec.tsx     ← Vitest unit tests
```

---

## Related ADRs

- [ADR 0001 — Three-Layer Component Architecture](./adr/0001-three-layer-component-architecture.md)
- [ADR 0004 — Contentful Renderers](./adr/0004-contentful-renderers.md)
- [ADR 0008 — Generic Composable Component Naming](./adr/0008-generic-composable-component-naming.md)
- [ADR 0015 — Motion Components in Element Layer](./adr/0015-motion-components-in-element-layer.md)
