---
title: 0018 - Contentful Wrapper Components and Model Taxonomy Alignment
date: 2026-06-23
status: proposed
---

# 0018 - Contentful Wrapper Components and Model Taxonomy Alignment

## Context

Our Contentful-aware integration components (currently located in `src/components/contentful/`) bridge the headless CMS data types with our presentation library (Blocks, Patterns, and Elements). However, the current setup has two main structural drawbacks:

1. **Flat File Structure**: The components are stored in a single flat directory, obscuring the logical hierarchies of our Contentful content models (Assembly, Page Section, Content, and Element) that are defined in `src/contentful/models/`.
2. **Procedural `if-else` Rendering**: Components like `ContentList` and `ContentSection` use procedural `if-else` chains to determine which visual Block to mount based on the adapted `ui` property. This approach violates the Open-Closed Principle, increases cognitive complexity, and scales poorly as more CMS-driven blocks are introduced.

We need to establish a scalable, declarative architecture for these integration wrappers that aligns the codebase's folder structure with our CMS model taxonomy.

## Decision

We will restructure our Contentful wrapper components and adopt a registry-driven rendering pattern:

1. **Taxonomy-Aligned Folder Directory**:
   Reorganize `src/components/contentful/` into subdirectories that mirror our Contentful schema namespaces:
   - `src/components/contentful/assembly/`: For route-level shell compositions (e.g. `ContentfulLayout`, `ContentfulPage`).
   - `src/components/contentful/page-section/`: For layout area containers (e.g. `ContentList`, `ContentSection`).
   - `src/components/contentful/element/`: For headless CMS primitive atoms (e.g. `Icon`, `Image`, `Link`, `BlockPlaceholder`).
   *Note: Fallback presentation components (`ContentItem`, `StatItem`) will be deleted entirely from the integration layer.*

2. **Single-Fetch Page-Level Architecture**:
   All Contentful data fetching (GraphQL queries) must occur strictly once at the page or layout level (e.g., in Next.js page routes). Dynamic wrappers and adapters at the page-section or component levels must not execute secondary GraphQL queries. Any global configuration data needed by sub-components (such as `siteLogo` for `HeroBanner`) must be passed down as props from the top page/layout level.

3. **Declarative Registries & Filtered Domain Models**:
   We decouple data validity checks from component rendering by filtering out invalid entries at the contentful adapter boundary:
   - **Adapter Filtration**: The `adaptContentSection` adapter will return `null` if the referenced entry (`item.entry`) is missing or invalid. The parent `adaptPage` adapter filters these out of the page areas, ensuring that the `ContentSection` component is never mounted for invalid references and `data.entry` is always non-null on its props contract.
   - **Unmapped UI Resolution**: If a wrapper component (`ContentList` or `ContentSection`) receives valid data but its `ui` property has no mapping in the declarative registry, it will render the `BlockPlaceholder` component.
   - **Development-Only Placeholders**: In development (`NODE_ENV === "development"`), the `BlockPlaceholder` displays a bordered container indicating the unmapped UI block. In production, it returns `null` to ensure public users see no broken blocks.

## Consequences

- **Positive**: Codebase directory navigation immediately matches our Contentful Content Type model taxonomy, making the system self-documenting.
- **Positive**: Adding a new CMS-driven Block only requires adding an entry to the registry rather than modifying procedural component render files.
- **Positive**: Eliminates nested API calls, ensuring high performance and predictable render streams.
- **Positive**: Removes dead fallback code, keeping visual concerns strictly decoupled from Contentful integration wrapper concerns.
- **Positive**: Speeds up debugging during content model mapping in development while preventing user-visible errors in production.
- **Negative**: Moving files requires updating import paths across Next.js layout/page files and test spec suites.
