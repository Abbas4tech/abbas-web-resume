---
"abbas-web-resume": patch
---

Fixed two colocated spec files using the wrong suffix (`.test.tsx` instead of `.spec.tsx`), which caused Vitest to silently skip them. Added ADR 0021 and ADR 0022 documenting the unit/component and E2E test coverage remediation plans.
