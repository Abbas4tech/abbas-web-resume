---
title: 0015 - Categorizing Motion and Behavioral Components in the Element Layer
date: 2026-06-21
status: accepted
---

# 0015 - Categorizing Motion and Behavioral Components in the Element Layer

## Context
Our architecture defines a strict three-layer layout: **Elements ← Patterns ← Blocks**. 
According to [CONTEXT.md](file:///d:/Projects/abbas-web-resume/CONTEXT.md), an **Element** was originally defined strictly as a "DaisyUI-class wrapper that carries no domain meaning and mirrors one DaisyUI component category."

However, we have introduced a suite of Framer Motion animation helpers (such as `MotionWrapper`, `MotionHover`, `MotionParallax`, and `MotionStagger`) and structural utilities (like `FrozenRouter`). These components:
1. Carry no domain meaning and no business logic.
2. Are reusable layout/behavior wrappers that accept `children`.
3. Do not map to a DaisyUI component class.

We need to resolve whether these behavioral components belong in the **Element** layer, or if we need to introduce a new layer, and how to structure this to maintain architectural clarity.

## Decision
We decide to **keep motion and behavioral wrappers inside the Element layer**, but explicitly categorize the Element layer into two sub-types:

1. **UI Elements (DaisyUI Elements)**:
   Wrappers around DaisyUI framework components (e.g., `Button` wrapping `.btn`, `Modal` wrapping `.modal`).
2. **Behavioral Elements (Utility Elements)**:
   Styling-agnostic helpers that provide structural, animation, or browser-event capabilities (e.g., `MotionWrapper`, `MotionParallax`, `FrozenRouter`).

To support this structure:
- All elements will be categorized and moved into one of two subfolders:
  - `src/components/elements/ui/` for visual style wrappers (e.g., `button`, `badge`, `modal`).
  - `src/components/elements/behavior/` for style-agnostic wrappers (e.g., `motion-parallax`, `frozen-router`).
- We will update the **Element** definition in [CONTEXT.md](file:///d:/Projects/abbas-web-resume/CONTEXT.md) to explicitly document the distinction between UI Elements and Behavioral Elements.

### Why not introduce a 4th layer?
Introducing a fourth layer (like `src/components/utilities/` or `src/components/motion/`) would break the simplicity of the 3-layer architecture, leading to ambiguity about whether custom behaviors are "utilities" or "elements," and complicating dependency mapping rules.

## Consequences
- **Positive**: Preserves the strict three-layer component hierarchy (**Elements ← Patterns ← Blocks**), ensuring simple import dependency enforcement.
- **Positive**: Clarifies the purpose of layout and animation wrappers in the design system.
- **Positive**: Avoids file reorganization overhead.
- **Negative**: Broadens the definition of the "Element" layer slightly beyond strict visual wrappers.
