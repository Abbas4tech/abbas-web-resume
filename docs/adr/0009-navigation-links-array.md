# 0009: Layout Content Model Strictness & Enhancements

## Status

`proposed`

## Context

The global `Layout` structure manages persistent site configurations (navigation, themes, drawer settings, logo). Currently, its Contentful content model relies heavily on loose text fields and generic references, causing several architectural issues:
1. **Loose Typing**: `defaultTheme`, `themeList`, `drawerVariant`, and `drawerSide` are unconstrained `Symbol` (string) fields. This allows CMS editors to make typos, and forces the frontend to blindly cast strings to strict UI types (e.g., `DrawerVariants`).
2. **Media as Assets**: The `logo` is an `Asset` reference. Contentful's raw assets lack strict schema requirements for accessibility (like mandatory `alt` text), whereas our custom `Image` content type enforces this.
3. **Generic Navigation**: Navigation is currently a generic `ContentList`, requiring fragile fallback logic for URLs.

We need to enforce strict structural and domain-level constraints on the `Layout` model.

## Decision

We will transition the `Layout` model to use strict validations and specific domain types.

### Detailed Plan & Snippets

1. **Drawer Variants & Sides**: Add strict `in` validations to `drawerVariant` and `drawerSide` matching the frontend component types.
   - `drawerVariant`: `["default", "dock-on-mobile"]`
   - `drawerSide`: `["left", "right"]`
2. **Theme Validations**: Add strict `in` validations to `defaultTheme` and `themeList` using the DaisyUI themes defined in `globals.css`.
   - Options: `["light", "dark", "cupcake", "dracula", "night", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "cmyk", "autumn", "business", "coffee", "winter", "caramellatte", "abyss", "silk"]`
3. **Logo as Image Entry**: Create a new `siteLogo` field accepting the `Image` content type, deprecating the raw `logo` Asset field.
4. **Navigation Array**: As previously agreed, transition navigation to a direct array of `Link` entries via a new `navigationLinks` field.

**Proposed `setup-content-model.ts` validations:**
```typescript
{
  id: "drawerVariant",
  name: "drawerVariant",
  type: "Symbol",
  validations: [{ in: ["default", "dock-on-mobile"] }],
}
```

### Logo UI Refactoring
Since `siteLogo` is now an `Image` entry instead of a raw `Asset`, the frontend `layout.ts` adapter will be updated to return an `AdaptedImage`. Consequently, the `AppHeader` component (and any other consumers of `logo`) will be refactored to use our existing `<ContentfulImage>` component rather than manual `<img />` tags, ensuring full accessibility and native Contentful image handling.

## Consequences

### Positives
* **Type Safety from CMS to UI**: By adding `in` validations, Contentful's GraphQL schema will generate strict TypeScript Enums/Unions for these fields. The frontend can safely pass them to `<Drawer>` without arbitrary casting.
* **Accessibility**: Moving `logo` to an `Image` entry forces editors to provide `alternativeText`.
* **Editor Experience**: CMS users get dropdown menus instead of raw text inputs, completely eliminating typos.

### Negatives / Trade-offs
* **Migration Overhead**: Applying strict `in` validations to existing fields in Contentful will fail if any existing entry has invalid data (e.g., if `drawerSide` currently says "Right" instead of "right"). We must ensure data is clean before applying validations.
* **Schema Updates**: Changing `logo` to `siteLogo` requires coordinating a non-destructive deployment strategy similar to the navigation links.

### Migration Strategy (Programmatic & Non-Destructive)

To avoid downtime, validation errors, and manual intervention:
1. **Programmatic Data Sanitization:** Before applying the strict `in` validations in `setup-content-model.ts`, the script will programmatically fetch existing `Layout` entries, sanitize `drawerVariant`, `drawerSide`, `defaultTheme`, and `themeList` to match the exact allowed strings, and re-publish the entries.
2. **CMS Addition:** The script adds `navigationLinks`, `siteLogo`, and applies the strict schema validations. 
3. **Code Update:** We update the GraphQL queries to support both paths (`layout.navigationLinks || layout.navigation?.customEntries`, and `layout.siteLogo || layout.logo`).
4. **Deployment:** The code is deployed safely.
5. **Content Migration:** The user populates the new fields in the CMS.
6. **Cleanup:** We remove the legacy fields (`navigation`, `logo`) from Contentful and the fallback code.
