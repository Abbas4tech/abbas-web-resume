---
title: 0013 - Error Page Layout Strategy
date: 2026-06-20
status: accepted
---

# Error Page Layout Strategy

## Context
When an error occurs during layout data fetching, or a page is not found, we need to show error states. 
The requirements are strict regarding the placement:
1. If layout data fetching fails (Server Error / 500), the error page must be displayed full screen (without the sidebar).
2. If a page is not found (404), the error page must be displayed within the sidebar layout.

## Decision
We leverage Next.js App Router's nested error boundary hierarchy rather than creating custom layout logic inside error components:
- **`src/app/error.tsx`**: We place the `error.tsx` boundary at the root, completely outside the `(app)` route group. Because it wraps the root `layout.tsx` (which contains only `<html>` and `<body>`) and replaces `(app)/layout.tsx`, any layout-level data fetching failure triggers a true full-screen error component.
- **`src/app/(app)/not-found.tsx`**: We place the `not-found.tsx` boundary inside the `(app)` route group. It is naturally wrapped by `src/app/(app)/layout.tsx`. To catch unknown routes effectively across the app and retain the layout, we also use a catch-all route inside `(app)` (`src/app/(app)/[...not-found]/page.tsx`) that triggers `notFound()`, ensuring unmatched routes still render within the sidebar layout constraint.

## Consequences
- **Positive**: We do not have to write custom CSS or pass props to hide the sidebar when an error occurs. Next.js natively handles the visual replacement.
- **Positive**: 404 pages naturally inherit the sidebar layout, keeping the user anchored in the navigation structure.
- **Negative**: The `error.tsx` boundary at the root will also catch errors from nested client components if they are not caught by a more specific, lower-level boundary. Currently, we use this as a blanket "Server Error" fallback.
