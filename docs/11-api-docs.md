# Chapter 11 — API Docs

This chapter documents the data interfaces exposed by the application: the Contentful GraphQL API, the TypeScript generated SDK, adapted types, and the patterns used to consume them.

> Every fragment, query, and type shown here is copied from (or trivially simplified from) the actual source
> files — `src/contentful/models/**/*.graphql`, `src/contentful/queries/*.graphql`, and
> `src/contentful/adapters/*.ts`. If in doubt, those files are authoritative; this chapter is a reading aid.

---

## GraphQL API

The application fetches all content from the **Contentful Content Delivery API (CDA)** via GraphQL.

| Property | Value |
|----------|-------|
| **Endpoint** | `${CONTENTFUL_API_BASE_URL}/{CONTENTFUL_SPACE_ID}/environments/{CONTENTFUL_ENVIRONMENT}` |
| **Auth** | Bearer token via `CONTENTFUL_CDA_TOKEN` header |
| **Client** | `graphql-request` v7 |
| **Type Generation** | `@graphql-codegen/cli` |

There are two live environments in the space — `development` and `production` — selected by
`CONTENTFUL_ENVIRONMENT`. See [Chapter 08 — CMS Handling](./08-cms-handling.md#environment-configuration).

---

## GraphQL Fragments

Fragments are co-located with their content model in `src/contentful/models/`, matching the folder layout
shown in [Chapter 08](./08-cms-handling.md#graphql-queries).

### `IconFields` Fragment

```graphql
fragment IconFields on Icon {
  __typename
  sys { id }
  internalName
  name
  library
  title
  color
  iconCode
  showTooltip
}
```

### `ImageFields` Fragment

```graphql
fragment ImageFields on Image {
  __typename
  sys { id }
  internalName
  image { url title description width height }
  alternativeText
  caption
}
```

### `LinkFields` Fragment

```graphql
fragment LinkFields on Link {
  __typename
  sys { id }
  internalName
  text
  url
  page { sys { id } path }
  icon { ...IconFields }
}
```

### `StatItemFields` Fragment

Renamed from the legacy `BadgeFields`/`Badge` — the underlying content type is `StatItem`.

```graphql
fragment StatItemFields on StatItem {
  __typename
  sys { id }
  internalName
  title
  progress
  iconsCollection(limit: 5) {
    items { ...IconFields }
  }
}
```

### `ContentItemFields` Fragment

```graphql
fragment ContentItemFields on ContentItem {
  __typename
  sys { id }
  entryField
  title
  subtitle
  description
  body {
    json
    links {
      entries { block { sys { id } ... on Image { ...ImageFields } } }
      assets { block { sys { id } url title description width height } }
    }
  }
  startDate
  endDate
  image { ...ImageFields }
  coverImage { ...ImageFields }
  icon { ...IconFields }
  linksCollection(limit: 5) { items { ...LinkFields } }
  subItemsCollection(limit: 10) { items { ...StatItemFields } }
  tags
}
```

> The `contentItem` content type also has a `progress` field ([`content-model.md`](./contentful/content-model.md#-content-item-contentitem)),
> but this fragment does not currently fetch it — it's schema-present, not yet wired into a query or adapter.

### `ContentListFields` Fragment

```graphql
fragment ContentListFields on ContentList {
  sys { id }
  internalName
  ui
  title
  description { json }
  entries
  customEntriesCollection(limit: 10) {
    items { ...ContentItemFields }
  }
}
```

### `ContentSectionFields` Fragment

`entry` is polymorphic — it can resolve to either a `ContentItem` or a `StatItem`:

```graphql
fragment ContentSectionFields on ContentSection {
  sys { id }
  internalName
  ui
  entry {
    ... on ContentItem { ...ContentItemFields }
    ... on StatItem { ...StatItemFields }
  }
}
```

### `SeoMetadataFields` Fragment

```graphql
fragment SeoMetadataFields on SeoMetadata {
  __typename
  sys { id }
  internalName
  title
  description
  keywords
  siteName
  publisher
  creator
  countryName
  canonicalUrl
  noIndex
  noFollow
  ogImage { ...ImageFields }
  favicon { url title }
}
```

### `PageFields` Fragment

```graphql
fragment PageFields on Page {
  __typename
  sys { id }
  internalName
  path
  title
  icon { ...IconFields }
  description {
    json
    links {
      entries { block { sys { id } ... on Image { ...ImageFields } } }
      assets { block { sys { id } url title description width height } }
    }
  }
  seo { ...SeoMetadataFields }
  topContentAreaCollection(limit: 5) {
    items {
      ... on ContentList { ...ContentListFields }
      ... on ContentSection { ...ContentSectionFields }
    }
  }
  bottomContentAreaCollection(limit: 5) {
    items {
      ... on ContentList { ...ContentListFields }
      ... on ContentSection { ...ContentSectionFields }
    }
  }
}
```

### `LayoutFields` Fragment

```graphql
fragment LayoutFields on Layout {
  __typename
  sys { id }
  internalName
  title
  role
  resume { url title }
  globalSeo { ...SeoMetadataFields }
  defaultTheme
  themeList
  siteLogo { ...ImageFields }
  email
  footerText
  resumeIcon { ...IconFields }
  themeIcon { ...IconFields }
  drawerVariant
  drawerSide
  navigationLinksCollection(limit: 10) {
    items { ...LinkFields }
  }
}
```

---

## Generated SDK (`src/contentful/generated/contentful-sdk.generated.ts`)

The codegen output exports a typed `getSdk` factory. All queries are called through this SDK:

```ts
import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/contentful/generated/contentful-sdk.generated";

const client = new GraphQLClient(endpoint, {
  headers: { Authorization: `Bearer ${process.env.CONTENTFUL_CDA_TOKEN}` },
});

const sdk = getSdk(client);
```

### Available Queries

There are exactly two queries defined (`src/contentful/queries/*.graphql`) — there is no
category/collection-listing query beyond what `GetPageByPath` already returns via each page's own
`contentList`/`contentSection` slots:

| Query | Parameters | Returns |
|-------|-----------|--------|
| `GetLayout` | `preview?: boolean` (default `false`) | `{ layoutCollection: { items: LayoutFieldsFragment[] } }` |
| `GetPageByPath` | `path: string`, `preview?: boolean` (default `false`) | `{ pageCollection: { items: PageFieldsFragment[] } }` |

Both return a `limit: 1` collection rather than a single entry directly — callers take `.items[0]`.

---

## Adapted Types

All raw GraphQL types are transformed by adapter functions (`src/contentful/adapters/`). The adapted types
are the **public API** consumed by all React components — Blocks never see a raw `*FieldsFragment` type.
Every adapter returns `null`/`undefined` for a missing source entry rather than throwing, so adapted types
are typically exported as `NonNullable<ReturnType<typeof adaptX>>`.

### `AdaptedIcon`

```ts
type AdaptedIcon = {
  __typename: "Icon";
  id: string;
  internalName: string;
  name: string;        // accessible name / tooltip text, e.g. "Typescript"
  library: string;      // e.g. "fa"
  iconCode: string;     // e.g. "fa/FaGithub" — what the Icon Element resolves against the curated registry
  color: string;
  title: string;        // adapted but not currently rendered anywhere
  showTooltip: boolean;
};
```

### `AdaptedImage`

```ts
type AdaptedImage = {
  __typename: "Image";
  id: string;
  internalName: string;
  alternativeText: string;
  caption: string;
  url: string;
  title: string;
  description: string;
  width: number;
  height: number;
};
```

### `AdaptedLink`

```ts
type AdaptedLink = {
  __typename: "Link";
  id: string;
  internalName: string;
  text: string;
  href: string;         // item.url, or item.page.path, or "#" as a last resort
  icon: AdaptedIcon | undefined;
};
```

### `AdaptedStatItem`

Renamed from `AdaptedBadge` — the underlying content type is `StatItem`.

```ts
type AdaptedStatItem = {
  __typename: "StatItem";
  id: string;
  internalName: string;
  title: string;
  progress: number;     // 0–100, defaults to 0
  icons: AdaptedIcon[];
};
```

### `AdaptedContentItem`

```ts
type AdaptedContentItem = {
  __typename: "ContentItem";
  id: string;
  entryField: string;
  title: string;
  subtitle: string;
  description: string;
  body: Document | null;   // Contentful Rich Text Document
  startDate: Date | null;
  endDate: Date | null;
  image: AdaptedImage | null;
  coverImage: AdaptedImage | null;
  icon: AdaptedIcon | undefined;
  links: AdaptedLink[];
  subItems: AdaptedStatItem[];
  tags: string[];
};

// A ContentSection's `entry` can resolve to either shape:
type AdaptedEntry = AdaptedContentItem | AdaptedStatItem;
```

### `AdaptedContentList`

```ts
type AdaptedContentList = {
  __typename: "ContentList";
  id: string;
  internalName: string;
  ui: string;              // e.g. "CardGrid" | "TimelineSection" — falls back to "CardGrid" if blank
  title: string;
  description: Document | undefined;
  category: string;        // the `entries` field's value, e.g. "Experience" | "Projects" | "Custom"
  customEntries: AdaptedContentItem[];
};
```

### `AdaptedContentSection`

```ts
type AdaptedContentSection = {
  __typename: "ContentSection";
  id: string;
  internalName: string;
  ui: string;              // e.g. "HeroBanner" | "SplitContentPanel" — falls back to "HeroBanner" if blank
  entry: AdaptedEntry;      // ContentItem or StatItem — narrow with __typename before use
};
```

### `AdaptedSeoMetadata`

```ts
type AdaptedSeoMetadata = {
  __typename: "SeoMetadata";
  id: string;
  internalName: string;
  title: string;
  description: string;
  keywords: string[];
  siteName: string;
  publisher: string;
  creator: string;
  countryName: string;
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  ogImage: AdaptedImage | null;
  favicon: { url: string; title: string } | null;
};
```

Consumed directly by `adaptPageMetadata` (`src/contentful/adapters/page-metadata.ts`) to build the Next.js
`Metadata` object returned from `generateMetadata` — every field above feeds a real `next/metadata` output
(OpenGraph, Twitter card, robots directives, canonical link, favicon), not just title/description.

### `AdaptedPage`

```ts
type AdaptedPage = {
  __typename: "Page";
  id: string;
  internalName: string;
  title: string;
  path: string;
  icon: AdaptedIcon | undefined;
  description: Document | null;   // rendered below the section heading
  seo: AdaptedSeoMetadata | null;
  topContentArea: (AdaptedContentList | AdaptedContentSection)[];
  bottomContentArea: (AdaptedContentList | AdaptedContentSection)[];
};
```

### `AdaptedLayout`

```ts
type AdaptedLayout = {
  __typename: "Layout";
  id: string;
  internalName: string;
  title: string;
  role: string;
  resume: { url: string; title: string } | null;
  globalSeo: AdaptedSeoMetadata | null;
  defaultTheme: string;
  themeList: string[];
  siteLogo: AdaptedImage | null;
  email: string;
  footerText: string;
  resumeIcon: AdaptedIcon | undefined;
  themeIcon: AdaptedIcon | undefined;
  drawerVariant: string;
  drawerSide: string;
  navigationLinks: AdaptedLink[];
};
```

---

## Type Guards

Each adapted type ships with a User-Defined Type Guard for polymorphic narrowing:

```ts
import {
  isAdaptedContentList,
  isAdaptedContentSection,
} from "@/contentful/adapters/content-list"; // and content-section

for (const item of page.topContentArea) {
  if (isAdaptedContentList(item)) {
    // item: AdaptedContentList
  } else if (isAdaptedContentSection(item)) {
    // item: AdaptedContentSection
  }
}
```

Never use `as unknown as Type` — always use type guards.

---

## Block Adapter Signatures

Each Block has its own adapter for transforming adapted CMS types into Block props — see
[`docs/07-component-architecture.md`](./07-component-architecture.md) for the full catalog. A few
representative signatures, showing that the input type (`AdaptedContentList` vs.
`AdaptedContentSection`) depends on which content type the Block's registry entry is registered under,
not on the Block itself — the same Block can even have adapters for both, when it's reachable from either
registry:

```ts
// LIST_BLOCK_REGISTRY entries take AdaptedContentList
adaptCardGrid(data: AdaptedContentList): CardGridProps
adaptTimelineSection(data: AdaptedContentList): TimelineSectionProps
adaptTimelineSectionWithBadges(data: AdaptedContentList): TimelineSectionProps
adaptSplitContentPanel(data: AdaptedContentList): SplitContentPanelProps

// SECTION_BLOCK_REGISTRY entries take AdaptedContentSection
adaptHeroBanner(data: AdaptedContentSection): HeroBannerProps
adaptSplitContentPanelFromSection(data: AdaptedContentSection): SplitContentPanelProps
```

`SplitContentPanel` is the one Block registered under **both** registries — `adaptSplitContentPanel` reads
a list's `customEntries`, `adaptSplitContentPanelFromSection` reads a single section entry's `body`/
`subItems` — both producing the same `SplitContentPanelProps` shape.
