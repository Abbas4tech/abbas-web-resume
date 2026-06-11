# Content Model Mapping Diagrams

This document visualizes the transition from our current highly-specific Contentful models to the new composable architecture.

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
        
        N[Page: '/skills'] -->|topContentArea| O[ContentList: 'Bento Skills Grid']
        O -->|entries| P[ContentItem]
        P -->|subItems| Q[Badge]
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

The `SkillSet` is a complex nested structure. In the new model, the parent `SkillSet` becomes a `ContentList` configured to render as a "Bento Skills Grid". The `SkillGroup` becomes a generic `ContentItem` acting as a category, and the actual skills become `Badge`s.

```mermaid
graph LR
    subgraph Old Model
        SS[SkillSet] --> SG1[SkillGroup: Frontend]
        SG1 --> I1[Icon: React]
        SG1 --> I2[Icon: Vue]
    end

    subgraph New Composable Model
        CL[ContentList: 'Bento Skills Grid'] --> CI[ContentItem: 'Frontend']
        CI --> B1[Badge: 'React']
        B1 --> IC1[Icon: React]
        CI --> B2[Badge: 'Vue']
        B2 --> IC2[Icon: Vue]
    end

    SS -.-> CL
    SG1 -.-> CI
    I1 -.-> B1
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
