---
status: proposed
---
# 0012 Motion Animation Strategy & Wrapper

Integrating `motion` (formerly framer-motion) into a Next.js App Router project introduces a challenge: `motion.div` and related components require React state/effects and must be Client Components (`"use client"`). If we apply `motion.div` directly inside our structural UI Blocks (like `HeroBanner` or `CardGrid`), those entire blocks become Client Components, pulling their entire subtree into the client bundle and defeating the purpose of our Server-First architecture.

We decided to introduce a strict architectural boundary by creating a standalone `MotionWrapper` Element. This wrapper explicitly declares `"use client"`, imports from `"motion/react-client"` (to ensure proper RSC tree-shaking), and accepts standard React Server Components via its `children` prop.

Furthermore, instead of passing raw Framer Motion variants through our Contentful Adapters (which would leak implementation details into our data layer), the `MotionWrapper` encapsulates a predefined dictionary of valid animation variants (e.g., `"fade-up"`, `"zoom-in"`). Blocks and patterns simply request a semantic animation name, maintaining clean separation of concerns.
