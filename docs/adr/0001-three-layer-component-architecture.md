# Three-Layer Composable Component Architecture (Elements → Patterns → Blocks)

We restructure `src/components/` from two informal layers (`ui/` + root) into three explicit, independently swappable layers — Elements, Patterns, and Blocks — each with a stable TypeScript props contract and a pure-function adapter at the Pattern and Block boundary. Blocks are completely independent of any data source; adapters own all data transformation.

---

## Status

`accepted`

---

## Context

The project is a Next.js personal resume application driven by Contentful CMS. Content is fetched via GraphQL and rendered as React components. The component library has grown organically into two informal layers:

- `src/components/ui/` — 13 DaisyUI wrapper files with no consistent contract
- `src/components/` root — 8 composed files mixing layout concerns, data fetching types, and visual structure

**Problems with the existing structure:**

1. **No enforced boundary** — `ExperienceCard` imports Contentful types directly; there is no layer that isolates UI from the data source.
2. **Domain names on visual components** — `ProfileBanner`, `ExperienceCard`, `SidebarMenu` name what they *display*, not what they *look like*. Renaming a resume section or repurposing a component requires hunting callsites.
3. **No composability contract** — Each component is ad-hoc. There is no shared pattern for props types, no guarantee a component accepts `className`, no standard for `forwardRef`.
4. **Future UI swappability is impossible** — If DaisyUI is replaced or a Contentful schema changes, every component touching that boundary must be individually updated.

The goal is a composable, independently swappable component system where visual structure, data transformation, and layout assembly are separated at explicit boundaries.

---

## Decision

### Layer 1 — Elements

**What:** Generic, low-level component primitives categorized into UI Elements and Behavioral Elements.

- **UI Elements** (`src/components/elements/ui/`): Wrappers around visual style framework (DaisyUI) components.
- **Behavioral Elements** (`src/components/elements/behavior/`): Styling-agnostic helpers that provide structural, animation, layout, or browser-event capabilities.

**Rules:**
- **UI Elements** mirror the DaisyUI component name (e.g. `MockupWindow` ← `mockup-window`). Props are HTML-native attributes + `className` only.
- **Behavioral Elements** describe their structural or utility behavior wrapper (e.g. `MotionParallax` ← `motion-parallax`). Props are behavior-specific configurations + standard React children/props.
- No business logic, no domain data, no imports from `@/types/`.
- Named sub-parts live in the same folder (e.g. `MockupWindowBody`).
- No adapter needed — Elements have no input transformation concern.

**Structure:**
```
elements/
  ui/
    button/
      index.tsx   ← implementation
      types.ts    ← exported props type
    mockup-window/
      index.tsx
      types.ts
  behavior/
    motion-parallax/
      index.tsx
      types.ts
    frozen-router/
      index.tsx
      types.ts
```

---

### Layer 2 — Patterns

**What:** Compositions of Elements that encode a reusable visual structure. Carry no domain meaning and are not tied to a specific page slot.

**Rules:**
- Named after visual structure, not domain content (e.g. `IconProgressRow`, not `SkillRow`)
- Props are plain TypeScript — no Contentful-generated types, no `@/types/entries` imports
- May compose other Patterns (upward only — never imports Blocks)
- Ships with `adapter.ts` — a pure TypeScript function that transforms an arbitrary input shape into the Pattern's props contract

**Structure:**
```
patterns/
  icon-progress-row/
    index.tsx    ← React component, uses Elements only
    types.ts     ← plain TS props interface
    adapter.ts   ← pure function: input → IconProgressRowProps
```

---

### Layer 3 — Blocks

**What:** Compositions of Patterns and/or Elements that occupy a named visual slot in the page layout (header, sidebar, hero, etc.).

**Rules:**
- Named after the visual slot, not the domain content (e.g. `HeroBanner`, not `ProfileBanner`; `TimelineSection`, not `ExperienceList`)
- **Completely independent of Contentful** — `index.tsx` and `types.ts` must never import from `@/types/entries`, `@/queries/`, or any Contentful SDK type
- Ships with `adapter.ts` — a pure TypeScript function that transforms the raw data input (today: hand-authored; future: Contentful SDK auto-generated type) into the Block's props contract
- Pages import and call the adapter function, then spread the result into the Block component

**Structure:**
```
blocks/
  hero-banner/
    index.tsx    ← React component, uses Patterns and Elements
    types.ts     ← plain TS props interface (no Contentful types)
    adapter.ts   ← pure function: RawInput → HeroBannerProps
```

---

### Adapter Pattern (pure function)

The adapter is **not a React component**. It is a `.ts` file exporting a named pure function.

```ts
// blocks/hero-banner/adapter.ts
import type { HeroBannerProps } from "./types";

// Input type is hand-authored today.
// Replace with Contentful SDK auto-generated type when codegen is set up.
export function adaptHeroBanner(input: {
  bannerImage: { url: string; title: string };
  profilePicture: { url: string; title: string };
  bannerAnimation?: string;
  socialLinks: Array<{
    description: string; title: string;
    url: string; width: number; height: number;
  }>;
}): HeroBannerProps {
  return {
    bannerImageSrc: input.bannerImage.url,
    bannerImageAlt: input.bannerImage.title,
    avatarSrc: input.profilePicture.url,
    avatarAlt: input.profilePicture.title,
    animation: input.bannerAnimation,
    socialLinks: input.socialLinks.map((link) => ({
      href: link.description,
      label: link.title,
      iconSrc: link.url,
      iconWidth: link.width,
      iconHeight: link.height,
    })),
  };
}
```

**Page usage:**
```tsx
// app/(app)/layout.tsx
import { HeroBanner } from "@/components/blocks/hero-banner";
import { adaptHeroBanner } from "@/components/blocks/hero-banner/adapter";

const heroBannerProps = adaptHeroBanner(data.bannerData);
return <HeroBanner {...heroBannerProps} />;
```

When Contentful's SDK codegen is configured, only `adapter.ts` changes — its input type is replaced with the auto-generated Contentful type. The Block, its Patterns, and all Elements underneath are untouched.

---

### Layer Dependency Rule

```
Elements  ←  Patterns  ←  Blocks  ←  Pages
```

- A lower layer never imports from a higher layer
- No file mixes layers (an Element file contains no Pattern code)
- `@/types/entries` and `@/queries/` are only permitted in `adapter.ts` files and page-level server components

---

### Naming Rules

| Layer | Rule | Example |
|-------|------|---------|
| Element (UI) | Mirrors the DaisyUI CSS class | `MockupWindow` ← `mockup-window` |
| Element (Behavioral) | Describes the utility or behavior | `MotionParallax` ← `motion-parallax` |
| Pattern | Describes the visual structure | `IconProgressRow`, `SocialLink`, `NavItem` |
| Block | Describes the visual slot in the layout | `HeroBanner`, `AppHeader`, `SidebarNav`, `BottomDock` |

Domain words are prohibited in Element, Pattern, and Block names. A component named after what it *displays* (`ProfileBanner`, `ExperienceCard`) must be renamed to describe what it *looks like* (`HeroBanner`, `TimelineEntry`).

---

### Folder Structure (Option B — folder-per-component)

Each component lives in its own folder. This co-locates the implementation, the contract (`types.ts`), and any stories/mocks/adapters — making each independently replaceable. Note that files must own their namespace explicitly rather than using generic `index.tsx` names.

```
src/components/
  elements/
    ui/
      button/            → button.tsx, button.stories.tsx
      card/              → card.tsx, card.stories.tsx
      mockup-window/     → mockup-window.tsx, mockup-window.stories.tsx
      badge/             → badge.tsx, badge.stories.tsx
      avatar/            → avatar.tsx, avatar.stories.tsx
      ...
    behavior/
      motion-parallax/   → motion-parallax.tsx, motion-parallax.stories.tsx
      frozen-router/     → frozen-router.tsx, frozen-router.stories.tsx
      ...
  patterns/
    theme-toggle/        → theme-toggle.tsx, theme-toggle.stories.tsx
    social-link/         → social-link.tsx, social-link.stories.tsx
    nav-item/            → nav-item.tsx, nav-item.stories.tsx
    icon-progress-row/   → icon-progress-row.tsx, icon-progress-row.stories.tsx, icon-progress-row.adapter.ts
    icon-cluster/        → icon-cluster.tsx, icon-cluster.stories.tsx, icon-cluster.adapter.ts
    section-heading/     → section-heading.tsx, section-heading.stories.tsx, section-heading.adapter.ts
    timeline-entry/      → timeline-entry.tsx, timeline-entry.stories.tsx, timeline-entry.adapter.ts
    media-card/          → media-card.tsx, media-card.stories.tsx, media-card.adapter.ts
    rich-text/           → rich-text.tsx, rich-text.stories.tsx, rich-text.adapter.ts
  blocks/
    app-header/          → app-header.tsx, app-header.stories.tsx, app-header.adapter.ts
    sidebar-nav/         → sidebar-nav.tsx, sidebar-nav.stories.tsx, sidebar-nav.adapter.ts
    hero-banner/         → hero-banner.tsx, hero-banner.stories.tsx, hero-banner.adapter.ts
    bottom-dock/         → bottom-dock.tsx, bottom-dock.stories.tsx, bottom-dock.adapter.ts
    split-content-panel/ → split-content-panel.tsx, split-content-panel.stories.tsx, split-content-panel.adapter.ts
    timeline-section/    → timeline-section.tsx, timeline-section.stories.tsx, timeline-section.adapter.ts
    panel-showcase/      → panel-showcase.tsx, panel-showcase.stories.tsx, panel-showcase.adapter.ts
    card-grid/           → card-grid.tsx, card-grid.stories.tsx, card-grid.adapter.ts
```

---

## Considered Options

### Option A — Keep flat `ui/` + root structure, add naming conventions only
Lowest effort. Adds no enforcement mechanism. The Contentful coupling in root components remains; future schema changes still touch every component. Rejected.

### Option B — Two layers only (primitive / composed)
Collapses the Pattern/Block distinction. When a page-slot Block needs to be independently swapped (e.g. replacing the sidebar layout without touching nav item Patterns), there is no boundary at which to swap. Rejected.

### Option C — shadcn/ui pattern (copy-paste per component, no shared contract)
Maximum per-component flexibility, no architecture to learn. But no contract is enforced — every consumer updates manually when a component's internal shape changes. Provides no adapter seam for data source changes. Rejected.

### Option D — Three layers, no adapters
Cleaner folder count. Rejected because the explicit goal is independent swappability. Retrofitting adapters later requires touching all consumers to redirect imports. Adding stubs now costs one file per component.

### Option E — Three layers with adapters as React wrapper components (not pure functions)
Initially proposed. Rejected during grilling — an adapter that renders JSX couples the data transformation to the rendering lifecycle, making it harder to test the transformation in isolation and harder to compose adapters (a pure function can be called anywhere; a component can only be rendered in a tree).

---

## Consequences

### Positive
- **Contentful schema changes are isolated** — only `adapter.ts` is touched when a Contentful field is renamed, restructured, or removed.
- **DaisyUI upgrades are isolated** — only Element files change when a DaisyUI class API changes.
- **Visual redesigns are isolated** — only Block files change when a page slot is redesigned.
- **Components are independently testable** — each layer can be tested with plain props; no data-fetching setup required.
- **Future Block renderer is straightforward** — a lookup table of adapter functions, keyed by a Contentful layout field, lets Contentful drive layout selection without page code changes.

### Negative / Trade-offs
- **File count increases significantly** — each component becomes a folder of 2–3 files.
- **Indirection increases** — reading how a Block renders requires following: page → adapter → Block → Patterns → Elements.
- **Naming discipline required** — contributors must understand the domain-free naming rule or the system degrades silently.
- **Adapter stubs are inert today** — the `adapter.ts` files are one-line pass-throughs until Contentful SDK codegen is set up; they exist to establish the pattern, not because they transform anything meaningful yet.

### Constraints created by this decision
- `@/types/entries` and `@/queries/` imports are forbidden in `index.tsx` and `types.ts` at the Pattern and Block layers. Biome's `noRestrictedImports` rule should enforce this once linting is stabilised (ESLint is being removed in favour of Biome/Ultracite).
- A Block must never be consumed directly from a page without calling its adapter first.
- A Pattern or Block file that mixes layers (imports from a higher layer, or contains both Element and Pattern code) violates the architecture and must be split.
