# Remove AOS Animation Library

* Status: accepted
* Deciders: Abbas, Agent
* Date: 2026-06-20

## Context and Problem Statement

The project currently uses `aos` (Animate On Scroll) for scroll-based animations. While AOS is a popular library, it adds unnecessary bundle size, relies on global event listeners, and modifies DOM state imperatively. In a modern Next.js/React environment with Tailwind CSS v4, we can achieve similar or better scroll-triggered animations using native browser APIs (like `IntersectionObserver`) and CSS transitions, or by using more React-centric animation libraries if complex orchestration is needed. We need to clean up `aos` from the entire codebase to improve performance and maintainability.

## Decision Drivers

* **Performance:** Removing `aos` reduces JavaScript bundle size and removes global scroll event listeners.
* **Modern CSS/React:** Tailwind and CSS animations paired with `IntersectionObserver` provide better performance and React-friendly patterns.
* **Maintainability:** Removing an external dependency simplifies the tech stack and avoids potential issues with React 18+ strict mode and hydration.

## Considered Options

* **Option 1: Remove `aos` entirely and rely on standard CSS/Tailwind animations.** (Selected)
* **Option 2: Replace `aos` with a React-specific library like `framer-motion`.** (Rejected for now, to keep bundle size minimal unless complex animations are strictly required.)
* **Option 3: Keep `aos` but optimize its loading.** (Rejected, as it still relies on imperative DOM mutation.)

## Decision Outcome

Chosen option: "Option 1: Remove `aos` entirely and rely on standard CSS/Tailwind animations", because it maximizes performance and simplifies our dependency tree. All existing `data-aos` attributes will be stripped, and any initial mounting animations can be handled via Tailwind classes (e.g., `animate-fade-in` or custom keyframes). If scroll-triggered animations are still desired, a custom React hook utilizing `IntersectionObserver` will be implemented natively in the future.

## Plan of Action (Cleanup Strategy)

To fully remove AOS, we will execute the following steps:

1. **Remove dependencies:**
   - Uninstall `aos` and `@types/aos` from `package.json`.
   
2. **Remove global styles:**
   - Remove `@import "aos/dist/aos.css";` from `src/app/globals.css`.

3. **Remove initialization logic:**
   - Remove `import AOS from "aos"` and its type imports from `src/components/elements/navigation/navigation.tsx` (and any `AOS.init()` calls if present).

4. **Strip `data-aos` attributes from components:**
   - `src/components/blocks/timeline-section/timeline-section.tsx`
   - `src/components/blocks/split-content-panel/split-content-panel.tsx`
   - `src/components/elements/drawer/drawer.tsx`
   - `src/components/blocks/panel-showcase/panel-showcase.tsx`
   - `src/components/blocks/card-grid/card-grid.tsx`
   - `src/components/blocks/hero-banner/hero-banner.tsx`

5. **Strip `data-aos` assertions from tests:**
   - `src/components/blocks/timeline-section/timeline-section.spec.tsx`
   - `src/components/blocks/split-content-panel/split-content-panel.spec.tsx`
   - `src/components/blocks/panel-showcase/panel-showcase.spec.tsx`
   - `src/components/blocks/card-grid/card-grid.spec.tsx`
   - `src/components/blocks/hero-banner/hero-banner.spec.tsx`

6. **Cleanup component props:**
   - Remove `animation` props from block component contracts (`timeline-section.tsx`, `split-content-panel.tsx`, `panel-showcase.tsx`, `card-grid.tsx`, `hero-banner.tsx`) as they were specifically passing AOS animation names.
