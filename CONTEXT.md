# Abbas Web Resume

A personal resume/portfolio web application built with Next.js, Tailwind CSS v4, and DaisyUI v5. Content is sourced from Contentful via GraphQL.

## Language

### Component Architecture

**Element**:
A DaisyUI-class wrapper that carries no domain meaning. Mirrors one DaisyUI component category (e.g. `btn`, `mockup-window`, `badge`). May have named sub-parts (e.g. `MockupWindowBody`) but the whole file stays within the Element layer. No domain data, no business logic.
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
The TypeScript props type that defines what a Pattern or Block accepts. The contract is stable; the implementation behind it changes. Elements expose HTML-native props and `className` only.
_Avoid_: interface, API

### Naming Rules

- **Element names** mirror the DaisyUI component class they wrap (e.g. `MockupWindow` ← `mockup-window`, `Badge` ← `badge`).
- **Pattern names** describe the visual structure they encode (e.g. `IconProgressRow`, `NavItem`). No domain words.
- **Block names** describe the visual slot they occupy in the layout (e.g. `HeroBanner`, `AppHeader`, `SidebarNav`). No domain words (e.g. not `ProfileBanner`, not `ExperienceCard`).

### Layer Dependency Rule

Elements ← Patterns ← Blocks. A lower layer never imports from a higher layer. Files never mix layers — a file that contains an Element sub-part does not also contain a Pattern.
_Avoid_: co-located cross-layer components
