# Goal: Clean Up Next.js Routes and Introduce Contentful Renderers

Currently, `page.tsx` and `layout.tsx` contain clumsy inline mapping logic to translate Contentful domains into UI Block props. We need to introduce `ContentfulPage` and `ContentfulLayout` as dedicated Block renderers so the Next.js routes can focus purely on data fetching.

## User Review Required

I propose moving `PageWrapper` out of `page.tsx` and into `ContentfulLayout` (which is used in `layout.tsx`). Right now, `page.tsx` has to make a redundant `GetLayout()` call just to get the navigation items for `PageWrapper`'s Next/Prev buttons. If we mount `PageWrapper` at the layout level, `layout.tsx` already has the navigation data, eliminating the duplicate network call and drastically simplifying `page.tsx`. Do you approve this move?

## Proposed Changes

### `src/components/contentful/`
- **[NEW] `contentful-layout.tsx`**: A component that takes `AdaptedLayout` as a prop and mounts the `DrawerProvider`, `AppHeader`, `SidebarNav`, `BottomDock`, and the `PageWrapper` (if approved).
- **[NEW] `contentful-page.tsx`**: A component that takes `AdaptedPage` as a prop and acts as the Block renderer, iterating over `topContentArea` and `bottomContentArea` to mount `ContentSection` and `ContentList`.

### `src/app/(app)/`
- **[MODIFY] `layout.tsx`**: Strip out all the inline mapping (e.g., manually restructuring `resumeIcon` or creating `mappedNavItems`). It will just fetch `contentfulSdk.GetLayout()`, adapt it, and return `<ContentfulLayout data={layoutData}>{children}</ContentfulLayout>`.
- **[MODIFY] `[[...slug]]/page.tsx`**: Strip out all the block rendering and redundant layout fetching. It will strictly fetch `GetPageByPath`, adapt it, and return `<ContentfulPage data={pageData} />`.

### Adapters
- **[MODIFY] `src/components/blocks/app-header/app-header.adapter.ts`**: Update the adapter to accept `AdaptedLayout` directly and do the object mapping internally.
- **[MODIFY] `src/components/blocks/sidebar-nav/sidebar-nav.adapter.ts`** and **`bottom-dock.adapter.ts`**: Update to accept `AdaptedLayout` directly and map the `navigation.customEntries` internally.

## Verification Plan

### Automated Tests
- Run `pnpm check` to verify formatting and linting rules.
- Run `pnpm tsc --noEmit` to ensure the type signatures across the new adapters and components line up perfectly.

### Manual Verification
- Render the local dev server and ensure the header, sidebar, bottom dock, and main content sections all mount correctly with the same UI layout as before.
