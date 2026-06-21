---
title: 0017 - Animated Grid Card Physics & Tilt Card Removal
date: 2026-06-21
status: accepted
---

# 0017 - Animated Grid Card Physics & Tilt Card Removal

## Context

Our component architecture features a project grid [CardGrid](file:///d:/Projects/abbas-web-resume/src/components/blocks/card-grid/card-grid.tsx) rendering multiple [MediaCard](file:///d:/Projects/abbas-web-resume/src/components/patterns/media-card/media-card.tsx) components. Originally, each project card was wrapped inside a custom client-side behavior component `MotionTiltCard`, which tracked mouse position dynamically to calculate a 3D tilt and radial glare gradient.

This approach suffered from severe performance issues on the deployed environment:
1. **High CPU overhead on mousemove**: Continuous React spring state updates (`useSpring` and `useTransform`) for multiple cards triggered layout repaints and execution overhead, causing stutter and lag.
2. **Dynamic glare computations**: Computing radial CSS gradients dynamically in JS on every frame degraded the rendering quality and animation fluidness.

We need to simplify the card interaction while offering a highly premium, physical layout animation when cards render.

## Decision

We will completely remove the 3D tilt interactions and overhaul our list layout animations:

1. **Delete `MotionTiltCard`**:
   We will completely remove `MotionTiltCard` and its mouse listeners to release CPU cycles, ensuring standard hover interactions are handled efficiently.
2. **Consolidated Fade and Scale Stagger**:
   We will upgrade our parent staggered wrapper **`MotionStaggerItem`** (which wraps all grid cards) to support a combined scale and opacity reveal transition.
3. **Advanced Spring Physics**:
   Instead of using simple translations, cards will scale from a lower scale up to their normal size as they enter the viewport:
   - **Start State**: `scale: 0.85`, `opacity: 0`, `y: 15`
   - **Target State**: `scale: 1.0`, `opacity: 1.0`, `y: 0`
   - **Spring Profile**: We will configure a custom physical model with high damping and moderate inertia (`stiffness: 120`, `damping: 18`, `mass: 1.1`) to ensure a smooth, premium settling motion that feels tactile and fluid.

## Consequences

- **Positive**: Complete elimination of mousemove listener overhead on cards, resulting in locked 60fps/120fps browser interactions.
- **Positive**: Extremely premium reveal sequence for portfolio cards that emphasizes structural depth and mass.
- **Positive**: Simplification of the codebase by removing unused custom mathematical hooks.
- **Negative**: The cards will no longer dynamically tilt toward the cursor position.
