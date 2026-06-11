# Content Model Migration Research

## Current State vs Target State Compatibility

### 1. Element Primitives
- **Current**: `Icon`, `Asset`
- **Target**: `icon`, `image`, `link`
- **Compatibility**: High. Existing `Icon` and `Asset` can be mapped directly to the target `icon` and `image` types. 

### 2. Specific Entities vs Composable Content
- **Current**: Highly specific entities:
  - `BioCard` (icon, title, value)
  - `JobExperience` (company, position, duration, techStack, etc.)
  - `ProjectCard` (thumbnail, description, deployedLink, etc.)
  - `SkillGroup` & `SkillSet`
- **Target**: Generic `contentItem` and `article`. 
- **Compatibility**: Moderate. The challenge is mapping highly specific fields (like `workedRemotely` or `endDate` in `JobExperience`) to generic `contentItem` fields. We can potentially use the `description` or `body` (RichText) for these specific details, or extend `contentItem` to have an optional key-value metadata list if strictly needed.

### 3. Page Structure
- **Current**: Global `AppData` with `pagesCollection`. Individual pages (`HomePage`, `ExperiencePage`, `SkillsPage`, `ProjectsPage`) have specific queries and exact expected arrays (e.g. `experiencesCollection`).
- **Target**: `page` entity with `topContentArea` and `bottomContentArea` containing generic `contentList` or `contentSection` entities. 
- **Compatibility**: Requires a complete rewrite of the frontend data fetching layer. Components will no longer fetch "Experiences", they will fetch a "Page" and dynamically render "Content Lists" based on their `ui` property (e.g. `Experience Timeline` or `Bento Skills Grid`).

### 4. Layout & SEO
- **Current**: Mixed inside `AppData` and `SEO` types. 
- **Target**: Explicit `layout`, `config`, and `seoMetadata` models.
- **Compatibility**: High. It's just a refactoring of fields into separate models.

## Proposed Mapping Strategy

| Current Entity | Target Composable Entity | UI Variant |
| --- | --- | --- |
| `HomePageData` | `page` | N/A |
| `BioCard` | `contentItem` | Inside `contentList` (Grid variant) |
| `ExperiencePageData`| `page` | N/A |
| `JobExperience` | `contentItem` | Inside `contentList` (`Experience Timeline` variant) |
| `ProjectsPageData` | `page` | N/A |
| `ProjectCard` | `contentItem` | Inside `contentList` (`Grid` or `Carousel` variant) |
| `SkillSet` | `contentList` | `Bento Skills Grid` |
| `SkillGroup` | `contentItem` | N/A |
| `AppData` / `Banner` | `layout` / `config` | N/A |
