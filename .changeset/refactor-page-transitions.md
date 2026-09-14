---
"abbas-web-resume": minor
---

Refactored page transitions to a hook-based architecture (`usePageTransition`) to decouple scroll behavior from the UI layer, preventing CSS regressions in components like `PageNavButton`. Removed the initial load animation to improve immediate visual performance. Updated ADR 0038 to reflect these changes.
