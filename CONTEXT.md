# Abbas Web Resume

A personal resume/portfolio web application built with Next.js, Tailwind CSS v4, and DaisyUI v5. Content is sourced from Contentful via GraphQL.

## Language

### Component Architecture

**Element**:
Carries no domain meaning and no business logic. Elements are physically grouped into two distinct categories:
1. **UI Elements** (`src/components/elements/ui/`): Wrappers around visual style framework components (e.g., `button` wrapping `.btn`, `badge` wrapping `.badge`, `modal` wrapping `.modal`).
2. **Behavioral Elements** (`src/components/elements/behavior/`): Styling-agnostic helpers that provide structural, animation, layout, or browser-event capabilities (e.g., `motion-parallax`, `motion-hover`, `frozen-router`).
_Avoid_: primitive, atom, base component

**Pattern**:
A composition of one or more Elements that carries no domain meaning and is independently swappable via an adapter. Encodes a repeating visual structure (e.g. a progress row with icons, a nav item with icon and label). Contains no Contentful-sourced data types in its props.
_Avoid_: molecule, organism, compound component

**Block**:
A composition of Patterns and/or Elements that occupies a named slot in a page layout (e.g. header, sidebar, hero). Named after its visual role, not its domain content. A Block is **completely independent of Contentful** — its props contract uses only plain TypeScript types, never Contentful-generated types. It knows nothing about where its data comes from.
_Avoid_: section, module, page component, template

**Adapter**:
A pure TypeScript function that transforms an input shape into a Block's (or Pattern's) props contract. It is not a React component. The file is `.ts`, not `.tsx`. Today the input shape may be hand-authored; in future it will be the Contentful SDK's auto-generated content model type. The adapter is the only place that knows about the input source.
_Avoid_: wrapper, mapper (use adapter), HOC

**Block renderer**:
A function or lookup table that reads a layout identifier from the input source and selects which Block to mount. Returns a React element. Enables the data source to drive layout decisions without pages hard-coding which Block appears where.
_Avoid_: factory, dynamic component

**Layer contract**:
The TypeScript props type that defines what a Pattern or Block accepts. The contract is stable; the implementation behind it changes. UI Elements expose HTML-native props and `className` only, while Behavioral Elements expose specific structural, animation, or browser-event configuration props.
_Avoid_: interface, API

### Naming Rules

- **Element names** follow their category:
  - **UI Elements** mirror the DaisyUI component class they wrap (e.g. `MockupWindow` ← `mockup-window`, `Badge` ← `badge`).
  - **Behavioral Elements** describe their structural or utility behavior wrapper (e.g. `MotionParallax` ← `motion-parallax`, `FrozenRouter` ← `frozen-router`).
- **Pattern names** describe the visual structure they encode (e.g. `IconProgressRow`, `NavItem`). No domain words.
- **Block names** describe the visual slot they occupy in the layout (e.g. `HeroBanner`, `AppHeader`, `SidebarNav`). No domain words (e.g. not `ProfileBanner`, not `ExperienceCard`).
- **Component files**: Do not use `index.tsx` or generic file names inside component folders. Files must own their component namespace explicitly to avoid editor tab confusion (e.g., `button.tsx`, `button.mock.ts`, `button.stories.tsx`, `button.adapter.ts`). Types should live in the main component `.tsx` file.

### Generic Composables (Variants)

**SplitContentPanel**:
A generic block layout featuring side-by-side text and media. Can be reversed or adjusted via variants.
_Avoid_: bio-section, profile-banner

**MediaCard**:
A generic card pattern that pairs media with text. Relies on layout and size variants instead of fixed domains.
_Avoid_: project-preview-card, experience-card

**IconLink**:
A pattern representing a hyperlink visually presented as an icon.
_Avoid_: social-link

**StatGroup**:
A group of statistics, using variants (e.g., `direction="row|col"`) for layout orientation.
_Avoid_: info-stat-row, icon-progress-group

### Layer Dependency Rule

Elements ← Patterns ← Blocks. A lower layer never imports from a higher layer. Files never mix layers — a file that contains an Element sub-part does not also contain a Pattern.
_Avoid_: co-located cross-layer components

### Content Modeling Vocabulary

**Layout**:
The single source of truth for all global, persistent site configurations. This includes the global navigation menu (`ContentList` of `Link` atoms), global headers, footer text, theme definitions (`defaultTheme`, `themeList`), site logo, and global UI action icons (e.g. `resumeIcon`, `themeIcon`). Replaces legacy `AppData` or `userInfo` singletons.
_Avoid_: AppData, userInfo, GlobalSettings

**Page**:
A strictly routable entity that defines a specific URL path. A Page contains composable lists and sections (`topContentArea`, `bottomContentArea`).
_Avoid_: route component

**ContentfulPage / ContentfulLayout**:
The Contentful-aware Block renderers. Next.js route files (`page.tsx`, `layout.tsx`) only fetch data and pass it to these components. These components live in `src/components/contentful/` and are solely responsible for mapping the domain data (e.g. `AdaptedPage`, `AdaptedLayout`) to UI Blocks using `ui` properties. They contain no logic other than mapping and rendering.
_Avoid_: doing mapping in Next.js routes

**Content Section**:
A standalone, non-global presentation wrapper (e.g. a "Hero Banner" or "Feature Teaser") placed directly on a `Page`. Sections do NOT belong in `Layout` unless they strictly appear across all URL routes.
_Avoid_: bannerData, heroWidget

### Testing Architecture Vocabulary

**Component Test**:
A fast, isolated test executing in Vitest + jsdom that mounts a single Element, Pattern, or Block to verify its interactions and rendering. It mocks next.js APIs natively.

**E2E Test**:
A Playwright-driven browser test that verifies full page routes, navigation, and visual regression. Because the application utilizes Next.js App Router Server Components (which fetch data outside the browser's network layer), E2E tests are detached from live Contentful data using **Mock Service Worker (MSW)** at the Node.js server level, returning predetermined structures using the same mock schemas expected by the Contentful SDK adapters.

**Block Object Model**:
A variation of the Page Object Model (POM) specific to our three-layer architecture. Since UI layout is dynamic and driven by CMS data, Playwright locators and actions are encapsulated within Block Object Models (e.g. `AppHeaderModel`, `SidebarNavModel`) rather than rigid Page Object Models. Tests dynamically compose Block Object Models based on the mock data injected.
_Avoid_: Page Object Model (POM) for full pages, since pages are dynamic.

### Optimization & Animation Vocabulary

**Curated Static Icon Registry**:
A static lookup dictionary that maps string identifiers to statically imported icon components, allowing complete tree-shaking of heavy icon libraries and eliminating dynamic component recreation lag at runtime.
_Avoid_: dynamically importing full icon submodules at render time.

**Tactile Spring Physics**:
Physics-based layout animations that coordinate scale, opacity, and positioning transitions using specific mass, damping, and stiffness properties, creating a heavy and premium settling motion.
_Avoid_: mousemove-linked spring calculations on grid cards that cause layout thrashing.

### Contentful Environment Architecture & Synchronisation

**Contentful Space & Environments**:
The application connects to a primary Contentful Space hosting both `development` and `master` environments. Schema definitions, fields, and icon entries are synchronised across both environments to ensure parity between dev/staging runs and production.
_Avoid_: referencing static credentials or using inconsistent environments across development branches.

**Icon Synchronisation Tooling**:
A utility process is used to harvest existing icon identifiers (e.g. from the legacy Contentful Space) and push them safely as unique, deterministic `icon` content entries (e.g. ID `icon-vsc-vscazuredevops`) into the target space's environments, avoiding duplicate content.

