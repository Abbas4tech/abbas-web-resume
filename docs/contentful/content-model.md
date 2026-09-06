# Contentful General Content Model

This document serves as the reference for the composable content model used in this application. It defines the structure, fields, and rules for all Content Types in Contentful.

## 1. Elements (Atoms)

These are the smallest building blocks, often embedded inside other content types.

### 🖼 Icon (`icon`)
Icon representation, primarily mapping to React-icons.
* **internalName** (Symbol, Required)
* **name** (Symbol, Required): The exact React-icon name (e.g., `FaGithub`).
* **iconCode** (Symbol): Optional code/class.
* **showTooltip** (Boolean)
* **library** (Symbol): The icon library (e.g., `fa`, `fi`).
* **title** (Symbol)
* **color** (Symbol): Hex color code.

### 🖼 Image (`image`)
Image assets with metadata and accessibility features.
* **internalName** (Symbol, Required)
* **image** (Asset Link, Required): The actual media file.
* **alternativeText** (Symbol, Required): Alt text for screen readers.
* **caption** (Symbol)

### 🔗 Link (`link`)
Links and navigation items for buttons and CTAs.
* **internalName** (Symbol, Required)
* **text** (Symbol, Required): The visible text of the link.
* **page** (Entry Link to `page`): Internal routing link.
* **url** (Symbol): External URL.

### 🖼 Stat Item (`badge`)
Lightweight item for stats, tags, and skills.
* **internalName** (Symbol, Required)
* **title** (Symbol, Required)
* **icons** (Array of Entry Links to `icon`)
* **progress** (Integer 0-100)

---

## 2. Content & Assembly (Molecules & Organisms)

### 📚 Content Item (`contentItem`)
Reusable, flexible content blocks used for experiences, projects, or articles.
* **entryField** (Symbol, Required): Display name.
* **title** (Symbol, Required)
* **subtitle** (Symbol): Used for company names, positions, etc.
* **description** (Text)
* **body** (RichText): The main rich text content.
* **startDate** / **endDate** (Date)
* **image** (Entry Link to `image`)
* **icon** (Entry Link to `icon`)
* **links** (Array of `link` entries)
* **subItems** (Array of `badge` entries): For nested items like TechStack in an Experience.
* **tags** (Array of Symbols)

### 💎 Content Section (`contentSection`)
Two-column content layouts with image positioning or hero areas.
* **internalName** (Symbol, Required)
* **ui** (Symbol, Required): The generic UI block mapping (e.g., `HeroBanner`, `SplitContentPanel`).
* **entry** (Entry Link to `contentItem`)

### 💎 Content List (`contentList`)
Lists of content items for page layouts.
* **internalName** (Symbol, Required)
* **ui** (Symbol, Required): The generic UI mapping (e.g., `CardGrid`, `PanelShowcase`).
* **title** / **description** (Symbol / Text)
* **entries** (Symbol, Required): The category of entries to fetch (e.g., `Experience`, `Projects`, `Custom`).
* **customEntries** (Array of `contentItem` entries): Manual override array.

---

## 3. Global & Routing (Templates & Pages)

### 📜 Page (`page`)
Main page definitions that map to URL routes.
* **internalName** (Symbol, Required)
* **path** (Symbol, Required, Unique): The URL path (e.g., `/`, `/about`).
* **title** (Symbol, Required)
* **description** (RichText): Page description, rendered below the section heading.
* **topContentArea** (Array of `contentList`, `contentSection`): Components rendered at the top of the page.
* **bottomContentArea** (Array of `contentList`, `contentSection`): Components rendered at the bottom.
* **seo** (Entry Link to `seoMetadata`)

### ⚙️ Layout (`layout`)
Site-wide configuration (Global settings).
* **internalName** / **title** (Symbol, Required)
* **role** (Symbol)
* **resume** (Asset Link): Downloadable resume file.
* **globalSeo** (Entry Link to `seoMetadata`)
* **defaultTheme** (Symbol)
* **themeList** (Array of Symbols)
* **logo** (Asset Link)
* **email** / **footerText** (Symbol)
* **resumeIcon** / **themeIcon** (Entry Link to `icon`)

### 🔍 SEO Metadata (`seoMetadata`)
Reusable Next.js SEO metadata configuration.
* **internalName** (Symbol, Required)
* **title** (Symbol)
* **description** (Text)
* **keywords** (Array of Symbols)
* **canonicalUrl** (Symbol)
* **noIndex** / **noFollow** (Boolean)
* **ogImage** (Entry Link to `image`)
