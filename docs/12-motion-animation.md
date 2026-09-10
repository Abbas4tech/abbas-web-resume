# Chapter 12 — Motion & Animation

This chapter documents the animation strategy, the Motion library integration, and the behavioral element catalog.

---

## Overview

All animations use **Motion** (formerly Framer Motion) v12. The strategy is defined by ADRs [0011](./adr/0011-remove-aos-animation-library.md), [0012](./adr/0012-motion-animation-strategy.md), [0014](./adr/0014-advanced-motion-integration.md), and [0015](./adr/0015-motion-components-in-element-layer.md).

---

## The Core Problem: Server Components + Client Animations

Next.js App Router Server Components fetch data outside the React render cycle. `motion.*` components require React state and must be `"use client"` components. If `motion.div` is placed directly inside a Block (e.g., `HeroBanner`), the entire Block becomes a Client Component, defeating the server-first architecture.

**Solution:** A dedicated `MotionWrapper` Behavioral Element acts as a `"use client"` boundary. It:
1. Declares `"use client"`
2. Imports from `"motion/react-client"` (RSC-compatible tree-shaking)
3. Accepts Server Component children via the `children` prop
4. Exposes a named animation variant dictionary instead of raw Framer Motion config

---

## Animation Variant Dictionary

Blocks and Patterns never pass raw Framer Motion `variants` objects. Instead, they pass a **semantic animation name**:

```tsx
// ✅ Correct — semantic name
<MotionWrapper animation="fade-up">
  <HeroContent />
</MotionWrapper>

// ❌ Wrong — leaks Framer Motion into the data/props layer
<MotionWrapper variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
```

### Available Variants

| Name | Effect |
|------|--------|
| `"fade-up"` | Fades in while translating upward |
| `"fade-down"` | Fades in while translating downward |
| `"fade-left"` | Fades in from the right |
| `"fade-right"` | Fades in from the left |
| `"zoom-in"` | Scales from 0.8 to 1.0 while fading in |
| `"zoom-out"` | Scales from 1.2 to 1.0 while fading in |
| `"slide-up"` | Translates upward without opacity change |

---

## MotionProvider

**Location:** `src/components/elements/behavior/motion-provider/motion-provider.tsx`

Wraps the application in a `LazyMotion` provider with asynchronously loaded features. This ensures Motion's animation features are only downloaded when needed, keeping the initial bundle lean.

```tsx
// app/layout.tsx
import { MotionProvider } from "@/components/elements/behavior/motion-provider/motion-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
```

**Required in Storybook:** `MotionProvider` is also injected as a global decorator in `.storybook/preview.tsx` so all stories can use motion components without per-story setup.

---

## Behavioral Elements Reference

### MotionWrapper

**Path:** `motion-wrapper/motion-wrapper.tsx`

General-purpose animation boundary. Applies entry animations when the element enters the viewport (`whileInView`).

**Props (matching the actual `MotionWrapperProps` in code — see [ADR 0025](./adr/0025-motion-coverage-audit-and-error-page-redesign.md) for a correction to this table's previous drift):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animation` | `"fade-up" \| "fade-in" \| "slide-left" \| "slide-right" \| "zoom-in"` | `"fade-up"` | Named animation to apply |
| `as` | `"div" \| "span" \| "section" \| "li" \| "ul" \| "header" \| "nav" \| "footer" \| "article"` | `"div"` | Underlying element/tag to render |
| `delay` | `number` | `0` | Delay before animation starts, in seconds |
| `once` | `boolean` | `true` | Whether to animate only on first entry |
| `children` | `ReactNode` | — | Content to animate |
| `className` | `string` | — | Additional CSS classes |

---

### MotionProvider

**Path:** `motion-provider/motion-provider.tsx`

Root `LazyMotion` provider. Must wrap the entire app. **Do not nest** multiple providers.

---

### MotionParallax

**Path:** `motion-parallax/motion-parallax.tsx`

Scroll-driven parallax effect. Children translate vertically at a configurable speed relative to scroll position using `useScroll` + `useTransform`.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | `number` | `0.3` | Parallax speed (0 = no movement, 1 = 1:1 with scroll) |
| `children` | `ReactNode` | — | |
| `className` | `string` | — | |

---

### MotionHover

**Path:** `motion-hover/motion-hover.tsx`

Applies spring-physics hover interactions (scale + shadow lift) using `whileHover`.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scale` | `number` | `1.05` | Scale factor on hover |
| `children` | `ReactNode` | — | |
| `className` | `string` | — | |

---

### MotionDraggable

**Path:** `motion-draggable/motion-draggable.tsx`

Makes children draggable within configurable axis constraints using Motion's `drag` API.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `axis` | `"x" \| "y" \| "both"` | `"both"` | Drag axis |
| `dragConstraints` | `{ top, left, right, bottom }` | — | Bounding box |
| `children` | `ReactNode` | — | |

---

### MotionStagger

**Path:** `motion-stagger/motion-stagger.tsx`

Two components, not one: `MotionStaggerContainer` (a structural wrapper, no animation of its own) and
`MotionStaggerItem` (each item tracks its own scroll visibility independently via `whileInView`, so a card
only animates once it's itself in view — deliberately not one shared trigger for the whole list).

**`MotionStaggerContainer` props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `"div" \| "ul" \| "ol" \| "section"` | `"div"` | Underlying element/tag |
| `children` | `ReactNode` | — | |
| `className` | `string` | — | |

**`MotionStaggerItem` props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `"div" \| "li" \| "span" \| "article" \| "h1" \| "h2" \| "h3" \| "p"` | `"div"` | Underlying element/tag — extended in [ADR 0025](./adr/0025-motion-coverage-audit-and-error-page-redesign.md) to cover semantic headings/paragraphs (e.g. a staggered card title that must stay an `<h1>`) |
| `once` | `boolean` | `true` | Whether to animate only on first entry |
| `children` | `ReactNode` | — | |

---

### MotionScrollProgress

**Path:** `motion-scroll-progress/motion-scroll-progress.tsx`

A horizontal progress bar that grows from 0% to 100% as the user scrolls down the page, using `useScroll` + `scaleX`.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | `"hsl(var(--p))"` | Bar color (DaisyUI CSS var) |
| `height` | `number` | `3` | Bar height in pixels |
| `position` | `"top" \| "bottom"` | `"top"` | Fixed position |

---

### MotionTextWriter

**Path:** `motion-text-writer/motion-text-writer.tsx`

Renders text character by character using `animate` with staggered children. Creates a typewriter effect.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text to animate |
| `speed` | `number` | `0.05` | Seconds per character |
| `className` | `string` | — | |

---

### FrozenRouter

**Path:** `frozen-router/frozen-router.tsx`

Freezes the Next.js router's navigation during exit animations. Prevents the route from changing until the exit animation completes.

Typically wraps the page content inside `app/layout.tsx` alongside `AnimatePresence`.

---

## Tactile Spring Physics

For animated grid cards (e.g., `CardGrid`), the project uses physics-based layout animations with specific spring parameters to create a heavy, premium settling motion.

See [ADR 0017 — Animated Grid Card Physics](./adr/0017-animated-grid-card-physics.md).

```ts
// Spring configuration for tactile card animations
const spring = {
  type: "spring",
  mass: 1.2,
  damping: 20,
  stiffness: 120,
};
```

This produces a heavy, damped settling motion rather than a fast, cheap animation — creating a premium feel.

---

## Why Motion was Chosen

| Reason | Detail |
|--------|--------|
| **RSC compatibility** | `motion/react-client` export enables proper Server Component tree-shaking |
| **Spring physics** | Native spring simulation without external physics library |
| **Scroll-driven** | `useScroll` + `useTransform` for parallax with no external deps |
| **LazyMotion** | Code-splitting of animation features to keep initial bundle small |
| **AOS removed** | Previous AOS library was a CSS-class-based solution incompatible with RSC and lacking fine-grained control. See [ADR 0011](./adr/0011-remove-aos-animation-library.md) |

---

## Motion Coverage by Block

Every Block either has a motion treatment fitted to its shape, or a documented reason it's deliberately
static — see [ADR 0025](./adr/0025-motion-coverage-audit-and-error-page-redesign.md) for the full per-Block
table and rationale (stagger for lists, hover for interactive cards/icons, `AnimatePresence` for
interaction-driven tab switches, and why `PageWrapper`/`SidebarNav` are intentionally left alone).

## Related ADRs

- [ADR 0011 — Remove AOS Animation Library](./adr/0011-remove-aos-animation-library.md)
- [ADR 0012 — Motion Animation Strategy](./adr/0012-motion-animation-strategy.md)
- [ADR 0014 — Advanced Motion Integration](./adr/0014-advanced-motion-integration.md)
- [ADR 0015 — Motion Components in Element Layer](./adr/0015-motion-components-in-element-layer.md)
- [ADR 0017 — Animated Grid Card Physics](./adr/0017-animated-grid-card-physics.md)
- [ADR 0025 — Motion Coverage Audit & Error Page Redesign](./adr/0025-motion-coverage-audit-and-error-page-redesign.md)
