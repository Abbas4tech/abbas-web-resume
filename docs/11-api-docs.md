# Chapter 11 — API Docs

This chapter documents the data interfaces exposed by the application: the Contentful GraphQL API, the TypeScript generated SDK, adapted types, and the patterns used to consume them.

---

## GraphQL API

The application fetches all content from the **Contentful Content Delivery API (CDA)** via GraphQL.

| Property | Value |
|----------|-------|
| **Endpoint** | `https://graphql.contentful.com/content/v1/spaces/{SPACE_ID}` |
| **Auth** | Bearer token via `CONTENTFUL_API_KEY` header |
| **Client** | `graphql-request` v7 |
| **Type Generation** | `@graphql-codegen/cli` |

---

## GraphQL Fragments

Fragments are co-located with their content model in `src/contentful/models/`:

### `IconFields` Fragment

```graphql
fragment IconFields on Icon {
  sys { id }
  internalName
  name
  iconCode
  showTooltip
  library
  title
  color
}
```

### `ImageFields` Fragment

```graphql
fragment ImageFields on Image {
  sys { id }
  internalName
  alternativeText
  image { url title width height }
  caption
}
```

### `LinkFields` Fragment

```graphql
fragment LinkFields on Link {
  sys { id }
  internalName
  text
  url
  page { path title }
}
```

### `BadgeFields` Fragment

```graphql
fragment BadgeFields on Badge {
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
  sys { id }
  entryField
  title
  subtitle
  description
  body { json links { entries { block { sys { id } } } } }
  startDate
  endDate
  image { ...ImageFields }
  icon { ...IconFields }
  linksCollection(limit: 5) { items { ...LinkFields } }
  subItemsCollection(limit: 20) { items { ...BadgeFields } }
  tags
}
```

### `ContentListFields` Fragment

```graphql
fragment ContentListFields on ContentList {
  sys { id }
  internalName
  ui
  title
  description
  entries
  customEntriesCollection(limit: 20) {
    items { ...ContentItemFields }
  }
}
```

### `ContentSectionFields` Fragment

```graphql
fragment ContentSectionFields on ContentSection {
  sys { id }
  internalName
  ui
  entry { ...ContentItemFields }
}
```

### `PageFields` Fragment

```graphql
fragment PageFields on Page {
  sys { id }
  internalName
  path
  title
  description {
    json
    links { entries { block { sys { id } ... on Image { ...ImageFields } } } assets { block { sys { id } url title description width height } } }
  }
  topContentAreaCollection(limit: 10) {
    items {
      ... on ContentList { ...ContentListFields }
      ... on ContentSection { ...ContentSectionFields }
    }
  }
  bottomContentAreaCollection(limit: 10) {
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
  sys { id }
  internalName
  title
  role
  defaultTheme
  themeList
  email
  footerText
  logo { url title }
  resume { url }
  resumeIcon { ...IconFields }
  themeIcon { ...IconFields }
  navigation { ...ContentListFields }
}
```

---

## Generated SDK (`src/contentful/generated/contentful-sdk.generated.ts`)

The codegen output exports a typed `getSdk` factory. All queries are called through this SDK:

```ts
import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/contentful/generated/contentful-sdk.generated";

const client = new GraphQLClient(process.env.CONTENTFUL_BASE_URL!, {
  headers: { Authorization: `Bearer ${process.env.CONTENTFUL_API_KEY}` },
});

const sdk = getSdk(client);
```

### Available Queries

| Query | Parameters | Returns |
|-------|-----------|--------|
| `GetPageByPath` | `path: string` | `PageFieldsFragment \| null` |
| `GetLayout` | `id: string` | `LayoutFieldsFragment \| null` |
| `GetContentItemsByCategory` | `category: string` | `ContentItemFieldsFragment[]` |

---

## Adapted Types

All raw GraphQL types are transformed by adapter functions. The adapted types are the **public API** consumed by all React components.

### `AdaptedIcon`

```ts
type AdaptedIcon = {
  __typename: "Icon";
  id: string;
  name: string;       // e.g. "FaGithub"
  library: string;    // e.g. "fa"
  iconCode: string;   // e.g. "fa/FaGithub"
  color?: string;
  showTooltip: boolean;
  title?: string;
};
```

### `AdaptedImage`

```ts
type AdaptedImage = {
  __typename: "Image";
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};
```

### `AdaptedLink`

```ts
type AdaptedLink = {
  __typename: "Link";
  id: string;
  text: string;
  href: string;       // external URL or internal path
  isExternal: boolean;
};
```

### `AdaptedBadge`

```ts
type AdaptedBadge = {
  __typename: "Badge";
  id: string;
  title: string;
  progress?: number;  // 0–100
  icons: AdaptedIcon[];
};
```

### `AdaptedContentItem`

```ts
type AdaptedContentItem = {
  __typename: "ContentItem";
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  body?: Document;    // Contentful Rich Text Document
  startDate?: string;
  endDate?: string;
  image?: AdaptedImage;
  icon?: AdaptedIcon;
  links: AdaptedLink[];
  subItems: AdaptedBadge[];
  tags: string[];
};
```

### `AdaptedContentList`

```ts
type AdaptedContentList = {
  __typename: "ContentList";
  id: string;
  ui: string;         // e.g. "CardGrid" | "TimelineSection"
  title?: string;
  description?: string;
  entries: AdaptedContentItem[];
};
```

### `AdaptedContentSection`

```ts
type AdaptedContentSection = {
  __typename: "ContentSection";
  id: string;
  ui: string;         // e.g. "HeroBanner" | "SplitContentPanel"
  entry?: AdaptedContentItem;
};
```

### `AdaptedPage`

```ts
type AdaptedPage = {
  __typename: "Page";
  id: string;
  path: string;
  title: string;
  description: Document | null;  // rendered below the section heading
  topContentArea: (AdaptedContentList | AdaptedContentSection)[];
  bottomContentArea: (AdaptedContentList | AdaptedContentSection)[];
};
```

### `AdaptedLayout`

```ts
type AdaptedLayout = {
  __typename: "Layout";
  id: string;
  defaultTheme: string;
  themeList: string[];
  email?: string;
  footerText?: string;
  logo?: AdaptedImage;
  resume?: { url: string };
  resumeIcon?: AdaptedIcon;
  themeIcon?: AdaptedIcon;
  navigation?: AdaptedContentList;
};
```

---

## Type Guards

Each adapted type ships with a User-Defined Type Guard for polymorphic narrowing:

```ts
import {
  isAdaptedContentList,
  isAdaptedContentSection,
} from "@/contentful/adapters";

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

Each Block has its own adapter for transforming adapted CMS types into Block props:

```ts
// Pattern: adapt{BlockName}(adapted: AdaptedX): BlockProps
adaptHeroBanner(item: AdaptedContentItem): HeroBannerProps
adaptTimelineSection(list: AdaptedContentList): TimelineSectionProps
adaptCardGrid(list: AdaptedContentList): CardGridProps
adaptSplitContentPanel(item: AdaptedContentItem): SplitContentPanelProps
```
