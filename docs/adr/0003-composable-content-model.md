# 0003: Composable Content Model Architecture

**Status:** accepted

## Context

Our current Contentful model is strictly typed and highly specific to the resume domain. We have explicit Content Types for every type of data (`BioCard`, `JobExperience`, `ProjectCard`, `SkillSet`). 

While this provides strong static typing and clear boundaries, it lacks scalability. Adding a new type of list (e.g., Certifications, Testimonials, Speaking Engagements) requires:
1. Creating a new Content Type in Contentful.
2. Writing new GraphQL queries.
3. Updating TypeScript types.
4. Building new React components explicitly tied to that data type.

As the portfolio grows, this rigid structure slows down iteration and prevents content editors from experimenting with different layouts and presentation styles.

## Decision

We will transition to a **composable "Content List / Item" hierarchy**. This generic architecture is built around presentation-agnostic blocks. 

The new model consists of four core layers:

1. **Atoms (Primitives)**
   - `icon`: Represents vector icons (e.g., react-icons) with `name` and `iconCode`.
   - `image`: Wraps Contentful assets with accessibility metadata, specifically a localized `alternativeText` and an optional `caption`.
   - `link`: Represents navigation elements or call-to-actions, containing either an external `url` or an internal reference to a `page` entry.

2. **Molecules (Content Item & Badge)**
   - `contentItem`: A generic, flexible block containing fields like `title`, `subtitle`, `description`, `body` (Rich Text), dates, `tags`, and references to `image` and `icon`. This replaces specific models like `JobExperience` or `ProjectCard`.
   - `badge`: To avoid infinite GraphQL recursion (where a `contentItem` nests another `contentItem` for its sub-items, like tech stack skills), we introduce a distinct, non-recursive `badge` content type. A `contentItem` uses the `badge` type for its `subItems` array.

3. **Organisms (Content List & Content Section)**
   - `contentList`: A collection of `contentItem`s. Its primary power comes from the `ui` field—a string enum (e.g., "Experience Timeline", "Bento Skills Grid", "Project Showcase") that dictates how the list of items is rendered.
   - `contentSection`: A single-item container for `contentItem`s with its own `ui` field (e.g., "Teaser - Image Fullwidth", "Two Columns - Image Left"). Useful for hero sections or standalone feature highlights.

4. **Templates (Page & Layout)**
   - `page`: Represents a URL path. Instead of a single array of sections, it defines a `topContentArea` and `bottomContentArea` to hold `contentList` or `contentSection` blocks, integrating distinct page layout regions cleanly.
   - `layout`: Global configuration for the site (header, banner, theme preferences).

## Considered Options for Nested Items (Recursion)

GraphQL does not support infinite recursion. Because a `contentItem` could theoretically contain a list of sub-`contentItem`s (e.g., a Job containing Skills), we needed a strategy to query this safely.

1. **Limit Query Depth**: Keep `subItems` as `contentItem`s, but hardcode the GraphQL query to stop at depth 1. (Rejected: Risks editor confusion if they nest too deeply and it doesn't render).
2. **Use String Tags**: Use a plain string array for tags instead of distinct items. (Rejected: We lose the ability to associate icons and specific metadata with skills).
3. **Distinct Sub-item Type (Selected)**: Create a lightweight, flat content type called `badge` that contains no recursive reference fields. A `contentItem` can hold `badge`s, but a `badge` cannot hold anything else. This provides safety at the schema level.

```typescript
// Contentful Schema snippet for Badge and ContentItem
await upsertContentType(environment, "badge", {
  name: "🏷 [Element] Badge",
  fields: [
    { id: "title", name: "title", type: "Symbol", required: true },
    { id: "icon", name: "icon", type: "Link", linkType: "Entry" },
  ],
});

await upsertContentType(environment, "contentItem", {
  name: "📚 [Content] Content Item",
  fields: [
    { id: "title", name: "title", type: "Symbol", required: true },
    // A ContentItem can contain Badges, but a Badge cannot contain ContentItems
    {
      id: "subItems",
      name: "subItems",
      type: "Array",
      items: { type: "Link", linkType: "Entry", validations: [{ linkContentType: ["badge"] }] },
    },
  ],
});
```

## GraphQL Implementation and Project Structure

With the new composable structure, our GraphQL queries transition from fetching hardcoded page types (`JobExperience`, `BioCard`) to fetching generic `contentList`s and `contentItem`s.

To keep the GraphQL codebase organized, we will adopt a strict category-based folder structure for our fragments and queries under `src/contentful/models`:

```text
src/contentful/models/
├── Element/
│   ├── icon.graphql
│   ├── image.graphql
│   ├── link.graphql
│   └── badge.graphql
├── Content/
│   ├── content-item.graphql
│   └── content-list.graphql
├── Page/
│   ├── page.graphql
│   ├── seo-metadata.graphql
│   └── layout.graphql
└── Queries/
    └── getPageByPath.graphql
```

### Example Query: Fetching a page and its composable sections
query GetPageByPath($path: String!) {
  pageCollection(where: { path: $path }, limit: 1) {
    items {
      title
      topContentAreaCollection {
        items {
          ... on ContentList {
            ui 
            entriesCollection {
              items {
                title
                subtitle
              }
            }
          }
          ... on ContentSection {
            ui
            entry {
              title
              subtitle
            }
          }
        }
      }
      bottomContentAreaCollection {
        # Similar fragment pattern
      }
    }
  }
}

## Frontend Data Architecture

The frontend implementation will follow a strict three-layer architecture to decouple the raw CMS structure from the React components.

### 1. Pure Adapters

We will introduce an adapter layer in `src/contentful/adapters/`. Every single Contentful model will have a dedicated pure adapter function. These functions transform the raw generated GraphQL types into clean, domain-specific objects that are decoupled from Contentful's metadata structure. We rely on `@graphql-request` acting as the underlying query client for our `contentful-sdk.generated.ts`.

Each adapted object must contain a strict `__typename` discriminator and a corresponding type guard. For polymorphic structures (e.g. union types in arrays), we enforce **User-Defined Type Guards** to naturally narrow TypeScript unions instead of relying on unsafe `as unknown as Type` or `any` casts.

```typescript
// Example Adapter Pattern (src/contentful/adapters/content-item.ts)
export function adaptContentItem(item: ContentItemFieldsFragment) {
  return {
    __typename: "ContentItem" as const,
    id: item.sys.id || "",
    title: item.title || "",
    // ... clean mappings
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

### 2. Component Mapping (1-to-1 Parity)

We will enforce a strict 1-to-1 naming convention between Contentful models and our React codebase. The Contentful model is the absolute source of truth. We will **not** use generic mapper components like `BlockRenderer` to abstract away the CMS structure.

To adhere strictly to `ultracite` (Biome) linting rules across this domain:
- **Kebab-Case Naming:** All adapter files and component files must be strictly kebab-case (e.g. `content-list.tsx`, `seo-metadata.ts`).
- **No Barrel Files:** We explicitly avoid `index.ts` files and favor direct relative or absolute path imports to preserve build performance and dependency graphs.
- **Interfaces over Types:** Component props must explicitly use `interface Props` rather than `type Props`.

If the CMS returns a `ContentList`, the codebase must have a `content-list.tsx` wrapper component that handles the *adapted* `AdaptedContentList` data type.

```tsx
// src/components/contentful/content-list.tsx
import { ExperienceTimeline } from "../blocks/ExperienceTimeline";
import { BentoSkillsGrid } from "../blocks/BentoSkillsGrid";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";

export interface Props {
  data: AdaptedContentList;
}

export function ContentList({ data }: Props) {
  const { ui, entries } = data;

  // The ContentList component is directly responsible for rendering its own UI variations,
  // maintaining the 1-to-1 conceptual link with the CMS model.
  switch (ui) {
    case 'Experience Timeline':
      return <ExperienceTimeline entries={entries} />;
    case 'Bento Skills Grid':
      return <BentoSkillsGrid entries={entries} />;
    default:
      return <div>Unknown UI type: {ui}</div>;
  }
}
```

```tsx
// src/components/contentful/content-item.tsx
import type { AdaptedContentItem } from "@/contentful/adapters/content-item";
import { Badge } from "./badge";

export interface Props {
  data: AdaptedContentItem;
}

export function ContentItem({ data }: Props) {
  return (
    <article>
      <h3>{data.title}</h3>
      <p>{data.subtitle}</p>
      {/* Recursively render Badges based strictly on the CMS model */}
      {data.subItems?.map(badge => (
        <Badge key={badge.id} data={badge} />
      ))}
    </article>
  );
}
```

## Environments
All schema creation, data migration, and initial component mapping development target the `development` environment in Contentful, ensuring our CLI commands and configurations reliably pull from the sandbox rather than `master`.

## Consequences

### Positive
- **Visual Composability:** We can build endless combinations of pages and layouts purely from the CMS without touching frontend code. Content editors gain full layout control.
- **Future-Proofing:** Adding a new section type usually just means adding a new `ui` enum string and building the React component mapping, without changing the CMS schema.

### Negative
- **Loss of Strict Typing:** We lose strict static typing on our GraphQL responses. A generic field like `subtitle` will hold different semantic meaning depending on the `ui` context (e.g., a company name in an "Experience Timeline", or a generic sub-heading in a "Grid").
- **Frontend Complexity:** The data fetching and mapping layer becomes more complex. However, enforcing a strict 1-to-1 component mapping (e.g., `ContentList.tsx`, `ContentItem.tsx`) ensures the codebase perfectly mirrors the CMS architecture, preventing abstract routing logic from obscuring the domain model.

## Legacy AppData & userInfo Mapping

In the previous data model, global settings were retrieved via a massive \userInfo\ object containing both site configuration and specific hero layouts. To strictly adhere to the composable model, this has been deprecated in favor of a clear delineation between **Global Layout** and **Page Sections**:

1. **Global Settings ? \Layout\**:
   - \defaultTheme\ and \	hemeList\ move strictly to the \Layout\ content model.
   - \logo\, \email\, and \ooterText\ are migrated directly onto \Layout\.
   - Global interactive icons (\	hemeIcon\ and \esumeIcon\) sit directly on \Layout\.
   - The PDF \esume\ asset itself remains directly accessible via \Layout\.
2. **Global Navigation ? \ContentList\**:
   - The legacy \pagesCollection\ is deprecated. Instead, \Layout\ defines a \
avigation\ field linked to a generic \ContentList\. The global menu is built by composing \Link\ primitives inside this list.
3. **Hero Banner ? \Page\ \ContentSection\**:
   - \annerData\ (containing profile pictures, animations, and banner social links) is explicitly stripped from global configurations. It is redefined as a \ContentSection\ with a "Hero Banner" UI enum, and injected into the \	opContentAreaCollection\ of the specific Homepage \Page\ entry.

## Infrastructure as Code (CMS Scripting)

**Crucial Constraint:** Every single change to the Contentful schema (adding fields, renaming fields, altering validations, or creating new content types) **MUST** be executed exclusively through the TypeScript migration scripts (e.g., \src/contentful/scripts/new-content-model.ts\). Manual UI schema edits in the Contentful Web App are strictly prohibited. This guarantees that the source of truth for the schema lives in version control alongside the codebase.
