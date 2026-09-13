# 34. Strict Semantic Color Enforcement for DaisyUI Theme Parity

Date: 2026-09-14

## Status

Accepted

## Context

The application allows users to toggle between different themes (e.g. `dark`, `light`, `cupcake`) powered by DaisyUI. However, many UI components (such as `Progress`, `Step`, `Carousel`) had hardcoded Tailwind utility colors (e.g., `bg-gray-100`, `text-gray-600`) embedded in their classes.

When a user switches themes, elements using hardcoded colors do not respect the active theme, resulting in visual bugs such as unreadable dark text on a dark background or glaring white patches on dark mode screens.

## Decision

We enforce the strict use of semantic DaisyUI color tokens (e.g., `base-content`, `base-200`, `neutral`, `primary`) instead of absolute color primitives (e.g., `gray-600`, `blue-500`) across all UI Elements and Patterns. 

Opacities should be handled using Tailwind's opacity modifier syntax on semantic tokens (e.g., `base-content/20`, `base-content/70`) rather than falling back to distinct utility colors.

## Consequences

- **Theme Compatibility**: Components will dynamically adapt to any DaisyUI theme out of the box without requiring manual `dark:` variant overrides.
- **Maintenance**: We only need to adjust the DaisyUI theme configuration to change the color palette globally, rather than finding and replacing hardcoded Tailwind utility classes scattered throughout the codebase.
- **Constraint**: Developers must actively avoid the instinct to use Tailwind's default primitive color palette and instead map their design requirements to the semantic roles provided by DaisyUI.
