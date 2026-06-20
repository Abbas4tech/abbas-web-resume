# 0008: Generic Composable Component Naming and Variants

## Status

`proposed`

## Context

Following [ADR 0001 (Three-Layer Component Architecture)](./0001-three-layer-component-architecture.md), we established a strict boundary between Elements, Patterns, and Blocks. The naming rule explicitly states:
> Domain words are prohibited in Element, Pattern, and Block names. A component named after what it displays (`ProfileBanner`) must be renamed to describe what it looks like (`HeroBanner`).

Despite this, an audit of the `src/components/` directory reveals that several components still carry domain-specific names or represent highly specific use cases. Examples include:
* **Blocks:** `bio-section`, `timeline-section`, `card-gallery`
* **Patterns:** `project-preview-card`, `social-link`, `icon-progress-group`, `info-stat-row`

As the application grows, components named for specific use cases (like "project" or "bio") reduce reusability. A developer building a blog might avoid using a `project-preview-card` even if the visual layout is exactly what they need. 

Furthermore, instead of creating monolithic specific components (e.g. `TabsWithGenericCard`), the UI needs to be built with fully composable structures relying on variants (based on sizes, content placement, etc.) aligning closely with DaisyUI's utility-first approach.

## Decision

We will transition the component library to a fully generic, composable naming structure leveraging variants.

### 1. Rename Domain-Specific Components to Generic Structures

Any component containing domain-specific words (bio, project, social, experience) or representing a very specific use case will be renamed to describe its visual and structural pattern.

**Proposed Pattern Renames:**
* `project-preview-card` → `MediaCard` (or `ActionCard`)
* `social-link` → `IconLink`
* `info-stat-row` → `StatGroup`
* `icon-progress-group` → `ProgressList`

**Proposed Block Renames:**
* `bio-section` → `SplitContentPanel` (or `MediaTextHero`)
* `card-gallery` → `CardGrid`

### 2. Implement Variant-Driven Composability

Instead of creating highly specific components, we will use generic base components with composition and variants. We will leverage `daisyui` primitives (like `card`, `tab`, `stat`, `hero`) and extend them with standard variant props:

* **Size Variants:** `sm`, `md`, `lg` (mapping to daisyui size utilities)
* **Layout Variants:** `horizontal`, `vertical`, `reverse` (for flex direction adjustments)
* **Visual Variants:** `primary`, `secondary`, `outline`, `ghost`

#### Example: MediaCard (formerly project-preview-card)
```tsx
type MediaCardProps = {
  size?: 'sm' | 'md' | 'lg';
  layout?: 'vertical' | 'horizontal';
  mediaPlacement?: 'top' | 'left' | 'right';
  // ... generic content props
};
```

### 3. Composition over Rigid Structures

Instead of baking complex structures into a single Pattern/Block, we will compose smaller generic Patterns.

**Example:**
Instead of a bespoke `TabsWithGenericCard` block, we combine generic elements:
```tsx
<Tabs variant="bordered">
  <TabList>
    <Tab>Tab 1</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <MediaCard size="lg" layout="horizontal" />
    </TabPanel>
  </TabPanels>
</Tabs>
```

## Consequences

### Positive
* **High Reusability:** Components can be repurposed across the entire application.
* **Reduced Cognitive Load:** Developers reach for standard visual blocks (`MediaCard`) rather than specific domain blocks.
* **Alignment with DaisyUI:** Follows a generic utility and variant approach.

### Negative / Trade-offs
* **Adapter Layer Complexity:** The adapter layer must do a slightly heavier lift to map domain concepts (e.g., "Project Data") to generic visual props (`MediaCard` properties).
* **Refactoring Cost:** Requires refactoring existing adapters, pages, and components to use the new names and variant props.
