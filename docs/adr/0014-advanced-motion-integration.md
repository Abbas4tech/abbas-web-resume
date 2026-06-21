---
title: 0014 - Advanced Motion Integration Strategy
date: 2026-06-20
status: accepted
---

# Advanced Motion Integration Strategy

## Context
Following the successful initial integration of `motion-react` (Framer Motion v12) via a simple `MotionWrapper`, there is a strong desire to dramatically improve the animation fidelity across the application. The goal is to leverage advanced physical models (springs), gestures, scroll-linked animations, and orchestrated timeline sequences to create a highly premium, "rich" feel, rather than just simple fade-ins.

However, the application utilizes Next.js App Router with Server Components (RSC). `motion` features like `useScroll`, `useTransform`, `whileHover`, and `AnimatePresence` rely heavily on React context and hooks, which require `"use client"`.

Additionally, layout-specific visual issues were identified:
- The `HeroBanner` image height was unrestricted, allowing full-resolution Contentful image uploads to dominate viewport space.
- The `TimelineSection` / `TimelineEntry` elements used a simple fade-up animation that lacked the "premium/richful" interactive fidelity desired.

## Decision
We will systematically upgrade our animation primitives while preserving the RSC architecture, and implement custom layout-preserving animation sequences:

1. **Client-Boundary Isolation**: 
   - We will not add `"use client"` to high-level blocks (`hero-banner.tsx`, `card-grid.tsx`) just to add parallax or scroll effects. 
   - Instead, we will create focused client-side animation wrappers (e.g., `MotionParallax`, `MotionStagger`, `MotionHover`) in the `src/components/elements/behavior/` directory. These will accept `children` (which can be Server Components).

2. **Advanced Feature Mapping**:
   - **Spring Physics**: We will adopt a global spring configuration (`stiffness: 120, damping: 14`) as our default transition to ensure physical consistency.
   - **Gestures (`whileHover`, `whileTap`, `drag`)**: We will apply these primarily to interactive patterns (`icon-link`, `media-card`, `nav-item`).
   - **Scroll Animations (`useScroll`)**: We will introduce parallax to the `hero-banner` and a scroll-linked progress indicator for the `timeline-section`. We also configured `.drawer-content` as the custom scroll container for the `AppHeader` to track active scrolled-state blur.
   - **Timeline Sequences**: We will replace hardcoded delays (e.g., `delay={index * 0.2}`) with `staggerChildren` variants on a parent `MotionStaggerContainer` to ensure perfectly synchronized orchestration.
   - **Shared Layout Animations (`layoutId`)**: We will use this in the `sidebar-nav` to smoothly animate the active state indicator between links.
   - **Exit Animations (`AnimatePresence`)**: We will apply this to dynamic elements like the `theme-toggle` icon switch.

3. **Banner Sizing & Fitting**:
   - Constrained the `HeroBanner`'s outer wrapper to responsive viewport height bounds: `h-[25vh] md:h-[35vh] max-h-[360px] min-h-[200px] w-full overflow-hidden relative`.
   - Scaled the inner image to `h-[130%] object-cover` with an offset of `-mt-[15%]` to provide a sufficient buffer margin for parallax translation, avoiding white space gaps on scroll.

4. **Timeline Entry Sequential Stagger**:
   - Upgraded `TimelineEntry` to a custom client-side animated pattern.
   - **Slide-in**: The entry container slides from the left (`x: -80` to `0`) and fades in using a spring transition (`stiffness: 100, damping: 15`).
   - **Typing Heading**: Implemented character-by-character typing using nested stagger variants (`staggerChildren: 0.025`). We wrapped the text inside an accessibility-compliant structure (`sr-only` text span for screen readers and `aria-hidden="true"` on the split characters) so standard search/locators (and unit tests) can still query the element.
   - **Staggered Meta Rows**: Animates with scale/slide-up spring transitions sequentially after the title completes.
   - **Clip-Path Curtain Reveal**: The rich text body description unrolls top-to-bottom using a CSS `clip-path` inset mask (`inset(0% 0% 100% 0%)` -> `inset(0% 0% 0% 0%)`) and springy slide-up.

## Consequences
- **Positive**: The UI will feel significantly more alive, reactive, and premium.
- **Positive**: By using isolated client wrappers, we maintain optimal bundle size and server-side rendering benefits.
- **Positive**: Typing and scroll transitions are fully accessible to assistive technologies (screen readers).
- **Negative**: Increased complexity in the component tree due to additional wrapper components.
- **Negative**: Client-side JS execution will slightly increase as `framer-motion` hooks execute on scroll and gesture events.
