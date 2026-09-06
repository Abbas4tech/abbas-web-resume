# Chapter 08 — CMS Handling

This chapter documents the Contentful integration: content model structure, GraphQL setup, TypeScript code generation, the adapter layer, and the Contentful renderer components.

---

## Overview

Content is stored in **Contentful** and fetched via **GraphQL** at request time using `graphql-request`. TypeScript types are auto-generated from the live schema by `graphql-codegen`. All raw Contentful types are transformed by pure adapter functions before they reach any React component.

```
Contentful CMS
  │  GraphQL API
  ▼
graphql-request (SDK)
  │  Auto-generated types (contentful-sdk.generated.ts)
  ▼
Adapter functions (src/contentful/adapters/)
  │  Typed Adapted* shapes
  ▼
Contentful Renderers (src/components/contentful/)
  │  Maps to Blocks
  ▼
UI Components
```

---

## Content Model

The content model uses a composable, presentation-agnostic hierarchy defined in [ADR 0003](./adr/0003-composable-content-model.md). See also [`docs/content-model.md`](./content-model.md) for the full field reference.

### Layer 1 — Atoms (Primitives)

| Content Type | Purpose |
|-------------|---------|
| `icon` | React-icon reference with library + name identifiers |
| `image` | Contentful asset with `alternativeText` and `caption` |
| `link` | Navigation item — internal `page` reference or external `url` |
| `badge` (stat item) | Flat, non-recursive sub-item for skills, tags, tech |

### Layer 2 — Molecules

| Content Type | Purpose |
|-------------|---------|
| `contentItem` | Generic flexible block: `title`, `subtitle`, `description`, rich `body`, dates, `tags`, nested `badge` sub-items |

### Layer 3 — Organisms

| Content Type | Purpose |
|-------------|---------|
| `contentList` | Collection of `contentItem`s. The `ui` field determines which Block renders them. |
| `contentSection` | Single `contentItem` wrapper. The `ui` field determines which Block renders it. |

### Layer 4 — Templates

| Content Type | Purpose |
|-------------|---------|
| `page` | Maps to a URL path. Has a rich text `description` rendered below the section heading, plus `topContentArea` and `bottomContentArea` content slots. |
| `layout` | Global site settings: navigation, logo, theme, resume asset, footer. |
| `seoMetadata` | Reusable SEO metadata (title, description, OG image, noIndex). |

---

## The `ui` Field — CMS-Driven Layout

The `ui` field on `contentList` and `contentSection` entries is a string enum that drives which React Block component renders. This enables layout changes directly from Contentful without code deploys.

### `contentList` UI Mappings

| `ui` value | Block rendered |
|-----------|---------------|
| `"CardGrid"` | `<CardGrid>` |
| `"PanelShowcase"` | `<PanelShowcase>` |
| `"TimelineSection"` | `<TimelineSection>` |

### `contentSection` UI Mappings

| `ui` value | Block rendered |
|-----------|---------------|
| `"HeroBanner"` | `<HeroBanner>` |
| `"SplitContentPanel"` | `<SplitContentPanel>` |

---

## GraphQL Queries

Queries are organized under `src/contentful/queries/` and fragments under `src/contentful/models/`:

```
src/contentful/
├── models/
│   ├── Element/
│   │   ├── icon.graphql
│   │   ├── image.graphql
│   │   ├── link.graphql
│   │   └── badge.graphql
│   ├── Content/
│   │   ├── content-item.graphql
│   │   └── content-list.graphql
│   └── Page/
│       ├── page.graphql
│       ├── seo-metadata.graphql
│       └── layout.graphql
└── queries/
    └── getPageByPath.graphql
```

### Example: Fetch Page by Path

```graphql
query GetPageByPath($path: String!) {
  pageCollection(where: { path: $path }, limit: 1) {
    items {
      title
      description {
        json
      }
      topContentAreaCollection {
        items {
          ... on ContentList {
            ui
            entriesCollection {
              items { title subtitle }
            }
          }
          ... on ContentSection {
            ui
            entry { title subtitle }
          }
        }
      }
    }
  }
}
```

---

## TypeScript Code Generation

Run `pnpm generate` to regenerate types from the live Contentful schema.

**Config file:** `codegen.ts`

The generated SDK (`src/contentful/generated/contentful-sdk.generated.ts`) exports:
- All GraphQL fragment types
- A typed `getSdk(client)` factory for all queries

Commit the generated file — it is part of the build.

---

## Adapter Layer (`src/contentful/adapters/`)

Every Contentful model has a dedicated adapter function. Adapters:

1. Transform raw auto-generated GraphQL types into clean, domain-specific objects
2. Add a `__typename` discriminator for runtime type narrowing
3. Export a User-Defined Type Guard for safe polymorphic narrowing

```ts
// src/contentful/adapters/content-item.ts
export function adaptContentItem(item: ContentItemFieldsFragment) {
  return {
    __typename: "ContentItem" as const,
    id: item.sys.id ?? "",
    title: item.title ?? "",
    subtitle: item.subtitle ?? "",
    body: item.body?.json ?? null,
    startDate: item.startDate ?? null,
    endDate: item.endDate ?? null,
    tags: item.tags ?? [],
    subItems: item.subItemsCollection?.items.map(adaptBadge) ?? [],
  };
}

export type AdaptedContentItem = ReturnType<typeof adaptContentItem>;

export function isAdaptedContentItem(item: unknown): item is AdaptedContentItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "ContentItem"
  );
}
```

### Adapter Conventions

- One adapter file per Contentful model (kebab-case: `content-item.ts`)
- Never uses `any` — `unknown` with type guards instead
- `ReturnType<typeof adapter>` is the exported adapted type (no manually written interfaces)
- Adapters for Blocks live alongside the Block in `blocks/*/[name].adapter.ts`

---

## Contentful Renderer Components (`src/components/contentful/`)

Renderers are the bridge between adapted data and UI Blocks. They contain **only mapping logic** — no data fetching, no business logic.

| Component | Input | Output |
|-----------|-------|--------|
| `ContentfulPage` | `AdaptedPage` | Loops `topContentArea` + `bottomContentArea`, renders `ContentList` / `ContentSection` |
| `ContentfulLayout` | `AdaptedLayout` | Renders global `AppHeader`, `BottomDock`, `SidebarNav` from layout data |
| `ContentList` | `AdaptedContentList` | Reads `ui` field → switches to correct Block |
| `ContentSection` | `AdaptedContentSection` | Reads `ui` field → switches to correct Block |
| `ContentItem` | `AdaptedContentItem` | Renders a single content item via sub-components |
| `Icon` | `AdaptedIcon` | Delegates to `<Icon>` UI Element with registry lookup |
| `Image` | `AdaptedImage` | Renders Next.js `<Image>` from Contentful asset URL |
| `Link` | `AdaptedLink` | Renders internal Next.js `<Link>` or external `<a>` |
| `StatItem` | `AdaptedBadge` | Renders badge as `<Stat>` element |

---

## Infrastructure as Code

All Contentful schema changes **must** be made through the TypeScript migration scripts, never through the Contentful Web App UI.

```bash
# Bootstrap / update the content model
pnpm contentful:setup
```

Script location: `src/contentful/scripts/setup-content-model.ts`

### Icon Synchronisation

A utility script harvests icon identifiers from the Contentful development environment and pushes them as deterministic `icon` content entries (ID format: `icon-{library}-{name}`, e.g., `icon-fa-FaGithub`) into both `development` and `master` environments, preventing duplicates.

---

## Environment Configuration

| Variable | `development` | `master` |
|----------|--------------|---------|
| `CONTENTFUL_ENVIRONMENT_ID` | `development` | `master` |
| `CONTENTFUL_API_KEY` | Dev CDA token | Prod CDA token |

The CI pipeline selects the environment automatically:
- PRs targeting `develop-draft` → `development`
- PRs targeting `main` → `master`

---

## Recursion Safety

GraphQL does not support infinite recursion. The `badge` content type exists specifically to prevent this: a `contentItem` can hold `badge` sub-items, but a `badge` cannot hold `contentItem`s. This breaks the recursion at the schema level. See [ADR 0003](./adr/0003-composable-content-model.md).

---

## Related ADRs

- [ADR 0003 — Composable Content Model Architecture](./adr/0003-composable-content-model.md)
- [ADR 0004 — Contentful Renderers](./adr/0004-contentful-renderers.md)
- [ADR 0016 — Curated Static Icon Registry](./adr/0016-curated-static-icon-registry.md)
