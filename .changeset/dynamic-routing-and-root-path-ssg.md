---
"abbas-web-resume": minor
---

Implement dynamic SSG page routing with `generateStaticParams`, `getPagePaths`, and `getPageData` helpers sourcing paths from Contentful. Transition the primary landing page from `/about` to root `/`, remove Next.js Edge Middleware (`src/middleware.ts`) for direct HTTP 200 responses, dynamically derive `AppHeader` default route from `Layout.navigationLinks`, and update synthetic test fixtures and documentation (ADR 0040).
