---
"abbas-web-resume": patch
---

Added E2E coverage for global chrome and navigation against the ADR 0022 fixture site: the header (resume link, theme toggle switching `data-theme`) and the sidebar/BottomDock navigation (every nav item routes correctly and picks up the active-item highlight, viewport-conditional between the two). New Block Object Models: `ThemeToggleModel`, `BottomDockModel`; `SidebarNavModel` gained `navLink()`/`isActive()`.

Fixed a real bug this surfaced: the active-sidebar-item highlight overlay had no `pointer-events-none`, silently swallowing clicks on the current page's own nav link.
