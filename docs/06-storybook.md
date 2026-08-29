# Chapter 06 — Storybook

Storybook is the isolated component development and documentation environment. It runs at **http://localhost:6006** and reflects the full three-layer component architecture.

---

## Setup Overview

| Property | Value |
|----------|-------|
| **Version** | Storybook v10 |
| **Framework** | `@storybook/nextjs-vite` (Vite-based, not webpack) |
| **Port** | 6006 |
| **Story Glob** | `src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)` |

### Why `nextjs-vite`?

The webpack-based `@storybook/nextjs` had severe incompatibilities with Node 22 (internal `punycode` deprecations). The Vite-based framework resolves all builder issues and aligns with the Vite toolchain already used by Vitest. See [ADR 0002](./adr/0002-storybook-architecture-and-conventions.md).

---

## Addons

| Addon | Purpose |
|-------|---------|
| `@storybook/addon-docs` | Auto-generates component documentation from JSDoc + props |
| `@storybook/addon-themes` | DaisyUI theme switcher in the Storybook toolbar |
| `@storybook/addon-a11y` | Live accessibility audit panel |
| `@storybook/addon-vitest` | Runs Vitest tests from within Storybook UI |
| `@chromatic-com/storybook` | Chromatic visual regression integration |

---

## Configuration Files

### `.storybook/main.ts`

```ts
const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
};
```

### `.storybook/preview.tsx`

All stories are wrapped with two global decorators:

1. **`MotionProvider`** — provides `LazyMotion` context required by all `motion/react` components
2. **`DrawerProvider`** — provides Drawer context required by `Dropdown` and similar components that call `useDrawer()` internally

```tsx
decorators: [
  (Story) => (
    <MotionProvider>
      <DrawerProvider side="left" variant="default">
        <Story />
      </DrawerProvider>
    </MotionProvider>
  ),
  withThemeByDataAttribute({ ... }),
]
```

This means motion animations work out-of-the-box in every story without per-story boilerplate.

---

## Theming in Storybook

The `@storybook/addon-themes` addon is configured with all DaisyUI themes via `withThemeByDataAttribute`. Switching themes in the Storybook toolbar applies the correct `data-theme` attribute to the preview iframe, mirroring production behavior exactly.

Available themes: `light`, `dark`, `cupcake`, `dracula`, `night`, `bumblebee`, `emerald`, `corporate`, `synthwave`, `retro`, `cyberpunk`, `valentine`, `halloween`, `garden`, `forest`, `aqua`, `lofi`, `pastel`, `fantasy`, `wireframe`, `black`, `luxury`, `cmyk`, `autumn`, `business`, `coffee`, `winter`, `caramellatte`, `abyss`, `silk`.

Default theme: **`dark`**

---

## Sidebar Hierarchy

The sidebar mirrors the repository's domain language and reinforces the three-layer architecture:

```
Elements
├── UI
│   ├── Button
│   ├── Badge
│   └── ...
└── Behavior
    ├── MotionWrapper
    └── ...
Patterns
├── IconProgressRow
├── MediaCard
└── ...
Blocks
├── HeroBanner
├── AppHeader
└── ...
```

Story titles use the `title` field to control placement:

```ts
// button.stories.tsx
const meta: Meta<typeof Button> = {
  title: "Elements/UI/Button",
  component: Button,
};
```

---

## Story File Conventions

### File Naming

Story files are named `[component-name].stories.tsx` (never `index.stories.tsx`). This aligns with the kebab-case file naming enforced by Ultracite and makes fuzzy file finding significantly faster.

### Mock Data Files

Every component must have a companion `[component-name].mock.ts` file that provides strongly-typed fixture data for all story variants:

```ts
// button.mock.ts
import type { ButtonProps } from "./button";

export const Default: ButtonProps = {
  children: "Click me",
  variant: "primary",
};

export const Loading: ButtonProps = {
  children: "Loading...",
  variant: "ghost",
  disabled: true,
};
```

Stories import from the mock file, keeping story files clean:

```tsx
// button.stories.tsx
import * as mocks from "./button.mock";

const meta: Meta<typeof Button> = {
  title: "Elements/UI/Button",
  component: Button,
};

export const DefaultStory: Story = { args: mocks.Default };
export const LoadingStory: Story = { args: mocks.Loading };
```

### Mock File Construction Rules

- Use `React.createElement` for `children` that contain JSX (Next.js compiler strictness)
- Use strongly-typed `import type { ComponentProps }` — no `any`
- Name exports after visual states, not domain content

---

## Development Phases

Storybook was built out in three phases following the layer architecture:

| Phase | Scope | Approach |
|-------|-------|----------|
| **Phase 1 — Blocks** | AppHeader, HeroBanner, SidebarNav, etc. | Comprehensive mock variants; subtree composition tests |
| **Phase 2 — Patterns** | IconProgressRow, MediaCard, NavItem, etc. | Mock data covering nested Element children |
| **Phase 3 — Elements** | 25+ UI Elements + 9 Behavioral Elements | Prop strictness verification; a11y checks |

---

## Running Storybook

```bash
# Development (watch mode)
pnpm storybook

# Static build (for CI / deployment)
pnpm build-storybook
```

The static build outputs to `storybook-static/` and is uploaded as a CI artifact on every PR.

---

## Chromatic Visual Regression

Chromatic integration is configured via `chromatic.config.json`. On CI, the Storybook static build is automatically submitted to Chromatic for visual comparison against the baseline.

If visual diffs are detected, Chromatic blocks the PR until a reviewer approves the changes.

---

## Related ADRs

- [ADR 0002 — Storybook Architecture and Conventions](./adr/0002-storybook-architecture-and-conventions.md)
