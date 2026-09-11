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

There are **two live Contentful environments** in the same space: `development` and `production` (selected
at runtime by the `CONTENTFUL_ENVIRONMENT` variable — see [Environment Configuration](#environment-configuration)
below). These are Contentful environment names, unrelated to this repo's git branch names.

---

## Content Model

The content model uses a composable, presentation-agnostic hierarchy defined in [ADR 0003](./adr/0003-composable-content-model.md). See [`docs/contentful/content-model.md`](./contentful/content-model.md) for the complete, field-by-field reference (kept in sync with `setup-content-model.ts`) — the tables below are a summary.

### Layer 1 — Atoms (Primitives)

| Content Type | Purpose |
|-------------|---------|
| `icon` | React-icon reference with library + name identifiers |
| `image` | Contentful asset with `alternativeText` and `caption` |
| `link` | Navigation item — internal `page` reference or external `url` |
| `statItem` | Flat, non-recursive sub-item for skills, tags, tech. Renamed from the legacy `badge` type — older docs/ADRs may still say `badge`. |

### Layer 2 — Molecules

| Content Type | Purpose |
|-------------|---------|
| `contentItem` | Generic flexible block: `title`, `subtitle`, `description`, rich `body`, dates, `image`/`coverImage`, `tags`, `progress`, nested `statItem` sub-items |

### Layer 3 — Organisms

| Content Type | Purpose |
|-------------|---------|
| `contentList` | Collection of `contentItem`s. The `ui` field determines which Block renders them. |
| `contentSection` | Single `contentItem`/`statItem` wrapper. The `ui` field determines which Block renders it. |

### Layer 4 — Templates

| Content Type | Purpose |
|-------------|---------|
| `page` | Maps to a URL path. Has a rich text `description` rendered below the section heading, plus `topContentArea` and `bottomContentArea` content slots, and an optional per-page `seo` override. |
| `layout` | Global site settings: navigation links, drawer variant/side, `siteLogo`, theme list, resume asset, footer text, global SEO fallback. |
| `seoMetadata` | Reusable SEO metadata (title, description, keywords, siteName/publisher/creator/countryName, OG image, favicon, noIndex/noFollow). Linked from both `layout.globalSeo` and `page.seo`. |

---

## The `ui` Field — CMS-Driven Layout

The `ui` field on `contentList` and `contentSection` entries is a string enum that drives which React Block component renders. This enables layout changes directly from Contentful without code deploys. An unrecognized `ui` value doesn't crash — it falls through to a `BlockPlaceholder` dev-mode fallback (see [ADR 0024](./adr/0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md)).

The full, current registries (`LIST_BLOCK_REGISTRY` in `content-list.tsx`, `SECTION_BLOCK_REGISTRY` in
`content-section.tsx`) are documented alongside the Block catalog itself in
[`docs/07-component-architecture.md`](./07-component-architecture.md#cms-block-registries) rather than
duplicated here — that file also explains which `ui` values share a single component via a `layout`/data
prop (e.g. `TimelineSection`/`TimelineSectionWithBadges`).

---

## GraphQL Queries

Queries live under `src/contentful/queries/`, fragments under `src/contentful/models/`:

```
src/contentful/
├── models/
│   ├── Element/
│   │   ├── icon.graphql
│   │   ├── image.graphql
│   │   └── link.graphql
│   ├── Content/
│   │   ├── contentItem.graphql
│   │   └── statItem.graphql
│   ├── page-section/
│   │   ├── contentList.graphql
│   │   └── contentSection.graphql
│   ├── assembly/
│   │   ├── page.graphql
│   │   └── layout.graphql
│   └── metadata/
│       └── seoMetadata.graphql
└── queries/
    ├── getPageByPath.graphql
    └── getLayout.graphql
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

Commit the generated file — it is part of the build. It is also the parsed source that
`scripts/contentful/verify-contentful-schema.py` reads directly (see [Schema Verification](#schema-verification-in-ci)
below) so that CI always exercises the app's real, current queries rather than a hand-copied second set.

---

## Adapter Layer (`src/contentful/adapters/`)

Every Contentful model has a dedicated adapter function. Adapters:

1. Transform raw auto-generated GraphQL types into clean, domain-specific objects
2. Add a `__typename` discriminator for runtime type narrowing
3. Export a User-Defined Type Guard for safe polymorphic narrowing

```ts
// src/contentful/adapters/content-item.ts
export function adaptContentItem(item: ContentItemFieldsFragment | null | undefined) {
  if (item?.__typename !== "ContentItem") {
    return null;
  }
  return {
    __typename: "ContentItem" as const,
    id: item.sys.id || "",
    title: item.title || "",
    subtitle: item.subtitle || "",
    body: (item.body?.json as Document) || null,
    startDate: item.startDate ? new Date(item.startDate as string) : null,
    endDate: item.endDate ? new Date(item.endDate as string) : null,
    tags: (item.tags || []).filter((tag): tag is string => tag !== null),
    image: adaptImage(item.image),
    coverImage: adaptImage(item.coverImage),
    subItems: (item.subItemsCollection?.items || []).map(adaptStatItem).filter(Boolean),
    // ...
  };
}

export type AdaptedContentItem = NonNullable<ReturnType<typeof adaptContentItem>>;

export function isAdaptedContentItem(item: unknown): item is AdaptedContentItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "ContentItem"
  );
}
```

(Simplified for readability — see `src/contentful/adapters/content-item.ts` for the exact implementation,
including `image`/`coverImage`/`icon`/`links` mapping and the shared `adaptEntry` polymorphic helper used
where a field can link to either a `contentItem` or a `statItem`.)

### Adapter Conventions

- One adapter file per Contentful model (kebab-case: `content-item.ts`, `stat-item.ts`)
- Never uses `any` — `unknown` with type guards instead
- `ReturnType<typeof adapter>` (usually wrapped in `NonNullable<...>`) is the exported adapted type — no manually written interfaces
- Adapters for Blocks live alongside the Block in `blocks/*/[name].adapter.ts`, and are pure functions from an `Adapted*` shape to that Block's plain props — Blocks never import Contentful-generated types directly (see [ADR 0001b](./adr/0001-block-renderers-and-element-adapters.md))

---

## Contentful Renderer Components (`src/components/contentful/`)

Renderers are the bridge between adapted data and UI Blocks. They contain **only mapping logic** — no data fetching, no business logic.

| Component | Location | Input | Output |
|-----------|----------|-------|--------|
| `ContentfulPage` | `assembly/contentful-page.tsx` | `AdaptedPage` | Loops `topContentArea` + `bottomContentArea`, renders `ContentList` / `ContentSection` |
| `ContentfulLayout` | `assembly/contentful-layout.tsx` | `AdaptedLayout` | Renders global chrome (`AppHeader`, drawer/sidebar nav, `BottomDock`) from layout data |
| `ContentList` | `page-section/content-list.tsx` | `AdaptedContentList` | Reads `ui` field → switches to the correct Block via `LIST_BLOCK_REGISTRY` |
| `ContentSection` | `page-section/content-section.tsx` | `AdaptedContentSection` | Reads `ui` field → switches to the correct Block via `SECTION_BLOCK_REGISTRY` |
| `Icon` | `element/icon.tsx` | `AdaptedIcon` | Delegates to the `Icon` UI Element with curated registry lookup |
| `Image` | `element/image.tsx` | `AdaptedImage` | Renders Next.js `<Image>` from the Contentful asset URL |
| `Link` | `element/link.tsx` | `AdaptedLink` | Renders internal Next.js `<Link>` or external `<a>` |
| `BlockPlaceholder` | `element/block-placeholder.tsx` | any unrecognized `ui` value | Dev-mode fallback so an unregistered `ui` string never crashes rendering |

There is no standalone `ContentItem`/`StatItem` renderer component — adapted `contentItem`/`statItem` data is
passed straight into whichever Block's adapter is selected by the `ui` registry; the Block itself owns
rendering.

---

## Infrastructure as Code

All Contentful schema changes **must** be made through the TypeScript migration scripts, never through the Contentful Web App UI.

```bash
# Bootstrap / update the content model (targets $CONTENTFUL_ENVIRONMENT, defaults to development)
pnpm contentful:setup
```

Script location: `src/contentful/scripts/setup-content-model.ts` — this is the single source of schema
truth; [`docs/contentful/content-model.md`](./contentful/content-model.md) is a human-readable mirror of it.

### Icon Synchronisation

A utility script (part of `setup-content-model.ts`'s startup routine) harvests icon identifiers used across
the codebase and pushes them as deterministic `icon` content entries (ID format:
`icon-{library}-{name}`, e.g., `icon-fa-FaGithub`) into the target environment, preventing duplicates. Since
`development` and `production` are separate environments, this runs once per environment you target with
`pnpm contentful:setup`.

### Other content-management scripts (`src/contentful/scripts/`)

Beyond schema setup, several standalone scripts handle content-level (not schema-level) operations. All are
dry-run-by-default and require an explicit `--apply` flag to write:

| Script | Purpose |
|--------|---------|
| `audit-environment-content.ts` | Read-only diff of entries between two environments — see [`docs/contentful/environment-migration.md`](./contentful/environment-migration.md) |
| `migrate-missing-content.ts` | Creates entries flagged `missingInTarget` by the audit above, in the target environment |
| `migrate-favicon-to-seo.ts` | One-time move of `layout.favicon` onto per-page `seoMetadata.favicon`, then removes the old field (omit-then-delete) |
| `migrate-timeline-tech-badges.ts` | One-time conversion of flat `tags` arrays into real `subItems` (`statItem`) links for `TimelineSection` entries — see [ADR 0026](./adr/0026-timeline-tech-badges-meta-row.md) |
| `extract-legacy-content.ts` / `migrate-legacy-content.ts` | One-time legacy-space → composable-space content migration — see [ADR 0019](./adr/0019-legacy-space-cross-schema-content-migration.md) |

See [`docs/contentful/environment-migration.md`](./contentful/environment-migration.md) for the full
audit → migrate workflow and its policy (only fills gaps, never resolves conflicts or overwrites existing
target data).

### Schema Verification in CI

`scripts/contentful/verify-contentful-schema.py` (pure Python, stdlib only) parses the app's actual
`gql\`...\`` queries directly out of the generated SDK file, resolves fragment interpolations, and executes
each one against both live environments in CI. This is what catches schema drift between `development` and
`production` before it reaches a real deployment — see [ADR 0031](./adr/0031-contentful-schema-parity-verification.md).

---

## Environment Configuration

| Variable | `development` (Preview/local) | `production` (Production) |
|----------|-------------------------------|----------------------------|
| `CONTENTFUL_ENVIRONMENT` | `development` | `production` |
| `CONTENTFUL_CDA_TOKEN`, `CONTENTFUL_SPACE_ID`, `CONTENTFUL_API_BASE_URL` | Identical across both scopes | Identical across both scopes |

`CONTENTFUL_ENVIRONMENT` is the **only** Contentful variable that legitimately differs by deployment scope —
see [ADR 0032](./adr/0032-vercel-environment-variable-cleanup.md). CI's `verify-contentful-schema` job runs
against both environments on every PR regardless of target branch (it isn't branch-name-selected — both
environments are checked every time, since either could regress independently).

`CONTENTFUL_MANAGEMENT_TOKEN` (write-capable) is used only by local/CI schema-management scripts
(`pnpm contentful:setup` and the scripts above) — it is deliberately **not** present in the deployed Vercel
runtime, which only ever reads content via the read-only CDA token.

---

## Recursion Safety

GraphQL does not support infinite recursion. The `statItem` content type exists specifically to prevent
this: a `contentItem` can hold `statItem` sub-items, but a `statItem` cannot hold `contentItem`s. This breaks
the recursion at the schema level. See [ADR 0003](./adr/0003-composable-content-model.md).

---

## Related ADRs

- [ADR 0003 — Composable Content Model Architecture](./adr/0003-composable-content-model.md)
- [ADR 0004 — Contentful Renderers](./adr/0004-contentful-renderers.md)
- [ADR 0016 — Curated Static Icon Registry](./adr/0016-curated-static-icon-registry.md)
- [ADR 0019 — Legacy Space Cross-Schema Content Migration](./adr/0019-legacy-space-cross-schema-content-migration.md)
- [ADR 0024 — Storybook Runtime Fixes & CMS Block Registry Expansion](./adr/0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md)
- [ADR 0026 — TimelineEntry Tech-Badges Meta Row](./adr/0026-timeline-tech-badges-meta-row.md)
- [ADR 0031 — Contentful Schema Parity Verification](./adr/0031-contentful-schema-parity-verification.md)
- [ADR 0032 — Vercel Environment Variable Cleanup](./adr/0032-vercel-environment-variable-cleanup.md)
