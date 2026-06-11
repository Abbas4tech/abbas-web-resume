# Block Renderers and Element Adapters

Context: We need to dynamically render different UI blocks (like `HeroBanner`, `TimelineSection`) from Contentful lists and sections. Passing raw Contentful fragments deeply through generic adapters leads to bloated "God" adapters that have to know every possible field for every specific UI block. Conversely, passing Contentful models into generic Elements (like `Icon`) violates our layer dependencies by coupling presentation directly to our headless CMS.

Decision:
1. We will use a 2-layer adapter concept for Contentful data. The first layer generic adapters (`adaptContentList`, `adaptContentSection`) transform raw Contentful models into generic domain data (`AdaptedContentList`). 
2. `ContentList` and `ContentSection` will act as Block renderers by inspecting the `ui` property on the adapted data, passing the *adapted* data into the second layer.
3. The specific block adapters (e.g. `adaptTimelineSection`) will take the generic `AdaptedContentList` (the first layer's output) and map it into the UI-ready props.
4. Elements like `Icon`, `Link`, and `Image` remain decoupled from Contentful, relying on the first layer adapters (`adaptIcon`) to provide plain TypeScript props.

Consequences: 
- The generic page adapters must contain all possible fields that any specific block might need.
- Specific block adapters never touch raw Contentful SDK fragments directly, keeping them pure from SDK-specific shapes.
