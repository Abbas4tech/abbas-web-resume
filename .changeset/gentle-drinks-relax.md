---
"abbas-web-resume": patch
---

Expanded the E2E device matrix from 4 to 6 projects: added Mobile Safari (`iPhone 14`, the only WebKit-engine mobile coverage — Desktop WebKit doesn't emulate iOS viewport/touch semantics) and a Tablet project (`iPad Mini`, 768px) that lands exactly in the gap where the app's off-canvas drawer is reachable at all (wide enough to not be treated as mobile, narrow enough that the drawer toggle button hasn't been hidden by the `lg` breakpoint yet).

Adding a project that could actually reach that drawer found a real bug: `DrawerProvider`'s `open` state always initialized to `true` on first render regardless of device (a stale-viewport-detection issue), which was invisible on desktop (CSS forces the sidebar open anyway) and on mobile (the drawer mechanism is swapped out entirely there) — but at tablet width, it meant the drawer's overlay backdrop covered the page's own content by default until manually dismissed. Fixed by defaulting to closed; a few E2E and unit tests that assumed the old (buggy) default updated to match.

This closes out ADR 0022 — all six planned E2E journey groups (fixture site, navigation, per-block content, routing/errors, accessibility, device matrix) are now implemented.
