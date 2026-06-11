---
status: accepted
---

# 0004 Extract Contentful Renderers from Next.js Routes

Next.js route handlers (`page.tsx` and `layout.tsx`) currently contain awkward inline mapping logic, acting as both data fetchers and "Block renderers." This mixes routing concerns with UI composition, forcing Next.js files to manually restructure data (like mapping arrays or unwrapping icons) before passing them to pure UI Blocks.

We decided to introduce `ContentfulPage` and `ContentfulLayout` components in `src/components/contentful/` to act as dedicated Block renderers. 

Next.js route files will strictly extract context and pass raw `AdaptedPage` and `AdaptedLayout` domain objects down. The new `ContentfulPage` and `ContentfulLayout` components will own the responsibility of mapping Contentful `ui` properties to our presentation Blocks and invoking the respective adapters (e.g., `adaptAppHeader`).

**Consequences:**
- Next.js route files stay purely focused on routing and data fetching.
- A clean boundary is maintained between the data source and visual Blocks.
- `ContentfulPage` and `ContentfulLayout` become the single source of truth for translating the UI-driven Contentful content model into our component library.
