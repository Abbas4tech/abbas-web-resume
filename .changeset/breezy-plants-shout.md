---
"abbas-web-resume": patch
---

Fixed a batch of Storybook-reported bugs, several with live production impact: `BottomDock`'s entrance animation was breaking its own `position: fixed` viewport pinning (a real mobile-nav bug, not Storybook-only); `CardGrid` hover state was bleeding across every card due to an unnamed Tailwind group colliding with `Drawer`'s own `group` wrapper; `Button` silently ignored DaisyUI variant classes (`btn-primary`, etc.) because hardcoded utility classes always won the cascade; `NotFound`/`ServerError`'s icon badge rendered pinned to the top-left instead of centered due to a stale DaisyUI v4 class name (`placeholder` → `avatar-placeholder` in v5); and `Progress`'s percentage count was clipped by an `overflow-hidden` added for an unrelated shimmer effect.

Also: replaced `HeroBanner`'s flat gray placeholder mock images/icons with real brand icons and photographic mock images; removed the `PageWrapper` story; and added explicit word-spacing to every `Blocks/*`, `Elements/*`, and `Patterns/*` Storybook title's component segment (e.g. `Blocks/BottomDock` → `Blocks/Bottom Dock`) so the sidebar no longer reads as squished PascalCase. See ADR 0027.
