# 0038. Page Transitions and Scroll Restoration

## Status

Proposed

## Context

The user experience during page navigation needs improvement. Currently, navigating between pages might retain the scroll position of the previous page, and the transition is abrupt.

We need to implement:
1. **Scroll Restoration/Top Reset**: Whenever a route change occurs, the viewport should scroll to the top so the main container (banner/data) is immediately visible.
2. **Page Transitions**: Smooth animations during route changes. Specifically, the current page content should slide/swipe up smoothly, followed by the new page content fading or sliding in.

Next.js App Router (which this project uses) has specific mechanisms for handling transitions. Since we are using `motion` (Framer Motion) as per `package.json` (`"motion": "^12.40.0"`), we will leverage it for page-level animations.

## Decision

1. **Scroll to Top on Navigation**:
   - We will implement a `ScrollToTop` component using Next.js `usePathname` hook. Whenever the pathname changes, we will trigger `window.scrollTo(0, 0)`.
   - Next.js has some default scroll behavior, but a dedicated client component ensures consistent behavior across all navigations.

2. **Animated Page Transitions with Motion**:
   - We will utilize Framer Motion's `AnimatePresence` to handle exit and entry animations for page transitions.
   - We will create a `PageTransitionWrapper` component that wraps the main content of each page or the root layout's children.
   - The animation will consist of:
     - **Exit Animation**: The current content swipes up (`y: "-100%"` or `y: -50`, `opacity: 0`).
     - **Entry Animation**: The new content swipes in from the bottom or fades in smoothly (`y: 50` to `y: 0`, `opacity: 0` to `opacity: 1`).

3. **Implementation Details in Next.js App Router**:
   - In Next.js App Router, page transitions with `AnimatePresence` require wrapping the `{children}` in a `template.tsx` file instead of `layout.tsx`, because `template.tsx` creates a new instance (and thus a new DOM element with a unique key) on every navigation, which is necessary for `AnimatePresence` to detect exit/entry.

## Consequences

- **Positive**: Smoother, app-like user experience during navigation. Consistent scroll position (top of page) on every new page view.
- **Negative**: Adds a slight delay to page navigation due to the exit animation duration. Need to carefully tune the animation duration (e.g., 0.3s - 0.4s) to ensure it feels snappy and not sluggish.

## Action Items

1. Create a `ScrollToTop` client component and add it to the root layout.
2. Create an `AnimatedTemplate` (or `template.tsx` at the root) using `AnimatePresence` and `motion.div`.
3. Configure the exit and initial/animate states in the template to achieve the "swipe up" behavior.
