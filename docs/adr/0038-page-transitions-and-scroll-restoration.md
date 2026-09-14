# 0038. Page Transitions and Scroll Restoration

## Status

Accepted

## Context

The user experience during page navigation needed improvement. Originally, navigating between pages retained the scroll position of the previous page, and the transition felt abrupt.

We required:
1. **Scroll Restoration/Top Reset**: Whenever a route change occurs, the viewport should scroll to the top smoothly so the main container is immediately visible before the next page loads.
2. **Page Transitions**: Smooth exit and entry animations during route changes.

Initial implementations explored wrapping Next.js navigations and forcing UI components (like `Button`) to act as `<Link>` wrappers to handle the transitions. This led to severe styling regressions and tight coupling. Furthermore, because the layout employs a custom scroll container (`#main-scroll-container`) rather than `window.scrollTo`, native scroll event listeners and standard Next.js scroll restoration behaviors were ineffective.

An initial "black and white" site load animation was also introduced but later removed as it introduced unnecessary delays and visual disjointedness.

## Decision

1. **Hook-Based Scroll Interception (`usePageTransition`)**:
   - The scroll-to-top logic and imperative routing are abstracted into a custom `usePageTransition` hook.
   - It intercepts standard navigation, uses `motion/react` (`animate`) to deterministically scroll `#main-scroll-container` to the top, and invokes `router.push(href)` in the `onComplete` callback.

2. **Custom Link Component for Declarative Usage**:
   - We implemented a custom `Link` component (in `src/components/elements/ui/link/link.tsx`) that wraps `next/link`.
   - It intercepts `onClick` events, calls `e.preventDefault()`, and triggers the `usePageTransition` hook to handle the scroll-then-navigate sequence. This applies the transition globally to structural links (e.g. Sidebar, Dock).

3. **Decoupled UI Components for Imperative Usage**:
   - For UI elements like `PageNavButton` that operate on programmatic hooks (e.g., `usePage`), we avoid forcing them into `<Link>` representations (which breaks styling). Instead, they remain standard `<button>` elements, and their backing hooks utilize `usePageTransition` directly.

4. **Next.js App Router Transitions**:
   - Exit/entry animations are handled via `AnimatePresence` in `src/app/(app)/template.tsx`. `template.tsx` is strictly utilized instead of `layout.tsx` because it creates a new instance on every navigation, allowing `AnimatePresence` to detect route changes and execute the "swipe up" and "fade in" animations correctly.

5. **Removal of Initial Load Animation**:
   - The `InitialLoadAnimation` component that blanketed the layout on initial render was removed for better immediate perceptual performance.

## Consequences

- **Positive**:
  - Predictable, app-like scrolling and transition behavior.
  - No CSS regressions or tight-coupling in UI components since the transition logic is abstracted to a reusable Hook.
  - Deterministic scroll animations via `framer-motion` ensure the transition to the next page only occurs when the scroll naturally completes.
- **Negative**:
  - Custom scroll interception bypasses some of Next.js's native prefetching and navigation heuristics during the interception window.
  - Requires developers to consistently use the custom `Link` component or the `usePageTransition` hook rather than native `router.push` or `next/link`.
