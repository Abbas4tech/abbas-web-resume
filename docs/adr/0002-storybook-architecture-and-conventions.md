---
status: accepted
---

# 0002: Storybook Architecture and Conventions

We are introducing Storybook to document and develop our three-layer component architecture (Elements, Patterns, Blocks). We need to ensure Storybook integrates smoothly with Next.js, our extensive DaisyUI theming system, and our architectural boundaries.

## Decisions

1. **Renderer:** We use `@storybook/nextjs-vite` and **Storybook v10**. Initially, the webpack-based `@storybook/nextjs` failed due to severe incompatibilities with Node 22's internal modules (`punycode`). Furthermore, transitioning the whole Storybook dependency tree (addons, core, test-runner) to `10.3.x` / `10.4.x` perfectly mirrors our unified ecosystem and natively resolves the builder issues.
2. **Theming:** We use `@storybook/addon-themes` configured with the full list of our DaisyUI themes (from `globals.css`). The addon natively handles applying the chosen theme to the `data-theme` attribute on the `<html>` element in the preview iframe, perfectly mirroring our production theming mechanism.
3. **Context Dependencies:** We inject a global `DrawerProvider` and a global `MotionProvider` decorator in `.storybook/preview.tsx`. Core UI elements (like `Dropdown`) call `useDrawer()` internally and throw if the context is missing, while all elements/patterns using `motion/react` lazy component `m` require the `LazyMotion` context features. Providing these globally treats them as required infrastructure rather than story-specific behavior, removing boilerplate from individual stories and enabling motion animations out-of-the-box.
4. **Data Fixtures:** Every component must have an accompanying `component-name.mock.ts` file alongside its implementation. These files provide strongly-typed mock data representing different variants, behaviors, and states to satisfy Next.js compiler strictness during `pnpm build`. Story files import from these local `.mock.ts` files to populate their `args`, keeping the story files clean and focused purely on rendering scenarios.
5. **File Naming:** Story files are named `component-name.stories.tsx` (e.g., `button.stories.tsx`) despite sitting alongside `index.tsx`. This aligns with our strict kebab-case file naming linter convention (`ultracite`) while avoiding the ambiguity of searching for `index.stories.tsx` in an IDE, making fuzzy finding significantly faster.
6. **Sidebar Hierarchy:** The Storybook sidebar explicitly mirrors the repository's domain language, categorized into `Elements/UI`, `Elements/Behavior`, `Patterns`, and `Blocks`. We do not use functional groupings (like "Navigation"). This reinforces the strict layer dependency rules outlined in `CONTEXT.md`.

## Development Plan

The comprehensive development plan for establishing Storybook mock views is structured into three phases across all architectural layers.

### Phase 1: Blocks (Highest Level)
- Created `.mock.ts` definitions containing comprehensive page-level variants.
- Verified robust sub-tree composition using `React.createElement` for robust injection testing.
- Generated `.stories.tsx` bindings.

### Phase 2: Patterns (Mid Level)
- Analyzed 12+ intricate patterns (e.g., AppHeader, HeroBanner, TimelineSection).
- Crafted `.mock.ts` that safely instantiate nested Elements while passing correct `children` types.
- Generated `.stories.tsx` iterating over all `mock.*` export permutations.

### Phase 3: Elements (Core Level)
- Processed 26+ foundational elements divided into UI Elements (e.g., Alert, Avatar, Drawer, Tooltip) and Behavioral Elements (e.g., MotionWrapper, MotionParallax, FrozenRouter).
- Verified prop strictness (e.g., buttons must specify `type="button"`).
- Addressed shadowing variables (e.g., avoiding globally shadowing `Error`).
- Configured component variations to cleanly map via `.mock.ts`.

### Example `.mock.ts` Structure
```typescript
import type { ElementProps } from "./types";
import React from "react";

// Representing the default functional variant
export const Default: ElementProps = {
  id: "element-default",
  variant: "primary",
  children: "Default Content",
};

// Representing a complex nested structural state
export const WithComplexChildren: ElementProps = {
  id: "element-complex",
  variant: "secondary",
  children: React.createElement("div", { className: "text-red-500" }, "Nested Child"),
};
```
