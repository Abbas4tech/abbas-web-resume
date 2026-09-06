---
"abbas-web-resume": patch
---

Added tests for the remaining untested behavioral elements (`motion-provider`, `frozen-router`), closed the branch gaps in `theme-toggle` and `drawer` (dock-on-mobile variant, right-side layout, view-transition support, active-theme highlighting), and added a test for the Contentful GraphQL client factory's endpoint/token resolution. Excluded the auto-generated GraphQL SDK and one-off Contentful migration scripts from the coverage target, and added a CI coverage floor (75% statements/lines, 65% branches) per ADR 0021 §2/§3 — the application code this measures already sits at ~92% statements / ~82% branches.
