---
"abbas-web-resume": patch
---

Wired `axe-playwright` into the shared E2E test fixture (`tests/e2e/fixtures/test-base.ts`) as an automatic `afterEach` hook, so every journey spec gets a WCAG scan for free instead of needing a parallel accessibility-only suite.

Running it for the first time surfaced and fixed three real, pre-existing accessibility bugs:
- Every page had two `<main>` landmarks — `Drawer` used `<main>` purely for a CSS class, wrapping the page's actual content `<main>`. Changed to `<div>`.
- Every sidebar nav item nested a `<button>` around a real link (`DrawerSideItem` wrapped `NavItem` in its own click-to-close-drawer button). Moved that behavior onto the link itself via a new `NavItem` `onClick` prop.
- `PanelShowcase`'s progress bars had no accessible name — the direct consequence of a content-model field (`subItem.title`) that PR 7 found was silently dropped by the adapter. Fixed properly this time: threaded through as the progress bar's `aria-label`.
- `IconLink` never passed a `name` to its icon-code icons, leaving the rendered SVG with no accessible text at all — one-line fix using a label that was already available but unused.

Three rules are disabled suite-wide as documented, accepted gaps (no `<h1>` on any page, sidebar/BottomDock not in a landmark, `.stats` rows not keyboard-focusable when they overflow) rather than fixed here — see ADR 0022 PR 9 for the reasoning and the dev-only `BlockPlaceholder` exclusion.
