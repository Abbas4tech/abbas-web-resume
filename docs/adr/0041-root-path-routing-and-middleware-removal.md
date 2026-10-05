---
status: accepted
date: 2026-10-05
---

# 41. Root Path Routing and Edge Middleware Removal

## Context

Originally, the primary landing page in Contentful was authored with the path `/about`. To ensure visitors hitting the root domain `/` were directed to the landing page, Next.js Edge Middleware (`src/middleware.ts`) was used to issue an unconditional redirect from `/` to `/about`:

```ts
// src/middleware.ts (former)
if (request.nextUrl.pathname === "/") {
  return NextResponse.redirect(new URL("/about", request.url));
}
```

This introduced several architectural drawbacks:
1. **Edge Middleware Invocation Overhead**: Every incoming request to `/` incurred an edge runtime evaluation and an extra HTTP 307 redirect round-trip before loading the page.
2. **Hardcoded Route Coupling**: Component layers (e.g. `AppHeader` logo click in `contentful-layout.tsx`) hardcoded `defaultRoute = "/about"`, diverging from the rest of the dynamic CMS-driven navigation architecture.
3. **E2E & Static Generation Divergence**: Static Site Generation (SSG) in `[[...slug]]/page.tsx` had to generate `/about` while treating `/` as a special redirected route rather than a first-class page.

## Decision

1. **Root Path as Primary CMS Page**:
   - The primary landing page in Contentful is assigned the path `"/"` instead of `"/about"`.
   - The corresponding navigation `Link` item in `Layout.navigationLinks` is configured with `href: "/"`.
2. **Removal of Edge Middleware**:
   - `src/middleware.ts` is deleted completely.
   - Root requests (`/`) are resolved directly as a static page with HTTP 200 via Next.js catch-all `[[...slug]]/page.tsx` (`resolvePath` maps empty slug array `[]` to `"/"`).
3. **Dynamic CMS-Driven Header Default Route**:
   - `ContentfulLayout` dynamically derives `defaultRoute` from `data.navigationLinks[0]?.href || "/"`, removing the hardcoded `"/about"` fallback.
4. **Test & Fixture Parity**:
   - Synthetic fixtures (`tests/mocks/fixture-site.ts`) and Playwright E2E suites are updated to assert on `/` directly.

## Consequences

### Positive
- **Zero Redirect Latency**: Visitors land directly on the root URL with a 200 OK without intermediate 307 redirects.
- **Simpler Runtime Architecture**: Eliminating Edge Middleware removes runtime compute overhead and simplifies static hosting.
- **Architectural Purity**: Landing page routing is driven completely by Contentful data models rather than framework-level redirect hacks.

### Negative / Trade-offs
- **Contentful Data Dependency**: The Contentful `Page` and `Layout.navigationLinks` entries must maintain path `"/"` for the landing page across all environments (`master` and `development`).
