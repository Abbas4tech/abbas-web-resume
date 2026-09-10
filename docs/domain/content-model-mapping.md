# Content Model Mapping Diagrams

This document visualizes the transition from our current highly-specific Contentful models to the new composable architecture.

> **Note (2026-09-06):** this document captures the original design intent (ADR-0003). For the
> migration-verified field-by-field mapping — checked against what the legacy and target frontends
> actually render, not just the schema shape — see
> [`legacy-space-migration-field-mapping.md`](../contentful/legacy-space-migration-field-mapping.md) and
> [ADR-0019](../adr/0019-legacy-space-cross-schema-content-migration.md). A few details below (the
> `"Bento Skills Grid"` UI name, and `JobExperience.techStack`'s mapping to `subItems`) turned out to
> differ from what actually ships — §4 below is corrected; the Job Experience diagram in §2 and the field
> table at the bottom are not, and should be read as illustrative rather than authoritative.

## 1. High-Level Architecture Shift

The old architecture required specific page types and globally fetched collections. The new architecture uses a single generic `page` type that constructs itself out of `contentList` sections.

```mermaid
graph TD
    subgraph Current Architecture
        A[ExperiencePage] --> B[JobExperience Collection]
        C[ProjectsPage] --> D[ProjectCard Collection]
        E[SkillsPage] --> F[SkillSet Collection]
    end

    subgraph New Composable Architecture
        G[Page: '/experience'] -->|topContentArea| H[ContentList: 'Experience Timeline']
        H -->|entries| I[ContentItem]
        I -->|subItems| J[Badge]
        
        K[Page: '/projects'] -->|topContentArea| L[ContentSection: 'Portfolio Hero']
        K -->|bottomContentArea| L2[ContentList: 'Project Showcase']
        L2 -->|entries| M[ContentItem]
        
        N[Page: '/skills'] -->|topContentArea| O[ContentList: 'PanelShowcase']
        O -->|entries| P[ContentItem: one per SkillSet]
        P -->|subItems| Q[StatItem: one per SkillGroup]
    end
```

## 2. Job Experience Entity Mapping

In the current model, `JobExperience` was its own distinct Content Type. In the new model, we use a generic `ContentItem` where the specific data is mapped to generic fields, and the `techStack` is represented by `Badge` items.

```mermaid
classDiagram
    class JobExperience_Old {
        +company: String
        +position: String
        +startDate: String
        +endDate: String
        +description: String
        +techStack: SkillGroup[]
    }
    
    class ContentItem_New {
        +title: String (Company)
        +subtitle: String (Position)
        +startDate: Date
        +endDate: Date
        +description: Text
        +subItems: Badge[] (TechStack)
    }

    JobExperience_Old ..> ContentItem_New : Migrates to
```

## 3. Project Card Entity Mapping

Similarly, `ProjectCard` fields map cleanly to the generic presentation fields of a `ContentItem`.

```mermaid
classDiagram
    class ProjectCard_Old {
        +title: String
        +description: String
        +thumbnail: Asset
        +deployedLink: String
    }
    
    class ContentItem_New {
        +title: String
        +description: Text
        +image: Image (Asset wrapper)
        +links: Link[] (Deployed URL)
    }

    ProjectCard_Old ..> ContentItem_New : Migrates to
```

## 4. Skills Entity Mapping

**Corrected 2026-09-06 (see [ADR-0019](../adr/0019-legacy-space-cross-schema-content-migration.md)):** an
earlier version of this diagram put the panel at the `SkillGroup` level, reasoning that a `PanelShowcase`
row needs a label to stay visible. Checking production's actual `skills/page.tsx` showed that's wrong —
`SkillGroup.title` is never rendered there, only used as a React key. Production's real heading is one
per `SkillSet` (icon + title, both rendered), with each `SkillGroup` as one *unlabeled* progress-bar row
underneath. The `ContentList` renders as `PanelShowcase` (not "Bento Skills Grid", which was never
actually deployed), with the panel at the `SkillSet` level:

```mermaid
graph LR
    subgraph Old Model
        SS[SkillSet: title + icon] --> SG1[SkillGroup: progress + icons]
        SG1 --> I1[Icon: React]
        SG1 --> I2[Icon: Vue]
    end

    subgraph New Composable Model
        CL[ContentList: 'PanelShowcase'] --> CI[ContentItem: title=SkillSet.title, icon=SkillSet.icon]
        CI --> SI1[StatItem row: progress + icons]
        SI1 --> IC1[Icon: React]
        SI1 --> IC2[Icon: Vue]
    end

    SS -.-> CI
    SG1 -.-> SI1
    I1 -.-> IC1
```

## Summary of Field Mappings

To implement the "Block Renderer" (frontend adapter), the mapping layer will translate generic API responses into component-specific props using these rules:

| Current Schema | Generic Field (`ContentItem`) | Notes |
|---|---|---|
| `company` | `title` | |
| `position` | `subtitle` | |
| `description` | `description` / `body` | Use `body` (Rich Text) for multi-paragraph |
| `techStack` | `subItems` | An array of `Badge` references |
| `thumbnail` | `image` | Maps to the internal `Image` wrapper |
| `deployedLink`| `links` | Array of `Link` wrappers |
