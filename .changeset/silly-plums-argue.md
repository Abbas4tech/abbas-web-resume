---
"abbas-web-resume": patch
---

Replaced the E2E suite's single near-empty mock page with a synthetic, fully fictional multi-page fixture site (`tests/mocks/fixture-site.ts`) covering every registered Block (`HeroBanner`, `SplitContentPanel`, `TimelineSection`, `CardGrid`, `PanelShowcase`), an unrecognized-`ui` page for the `BlockPlaceholder` fallback, and a 6-item nav. Factories in `tests/mocks/factories.ts` are now typed against the generated Contentful SDK fragments instead of being an unused skeleton. Part of the ADR 0022 E2E expansion plan (§1, fixture foundation).

While wiring this up, found and fixed two real bugs surfaced by the richer fixture:
- Next.js's on-disk fetch Data Cache (`.next/cache/fetch-cache`) was silently serving real, previously-cached Contentful responses instead of MSW's mocked ones across dev-server restarts, defeating E2E mocking entirely without any error. `playwright.config.ts`'s `webServer` now clears that cache directory before every run.
- `AppHeaderModel`'s `titleLink` locator (`.navbar-start .btn-ghost`) also matched the drawer toggle button, throwing a strict-mode violation the first time anything actually called `getTitle()`.

Also discovered that `src/middleware.ts` unconditionally redirects `/` to `/about`, so a fixture Page at path `/` would never be reachable — the fixture's `HeroBanner` now lives on `/about` instead.
