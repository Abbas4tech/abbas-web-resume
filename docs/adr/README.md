# Architecture Decision Records (ADR) Index

This directory contains Architecture Decision Records — documents that capture the key technical and architectural decisions made during the development of this project, their context, the options considered, and their consequences.

> **Format:** Each ADR is named `NNNN-short-title.md`. Status values: `accepted`, `deprecated`, `superseded`.

---

## Index

| # | Title | Status | Date |
|---|-------|--------|------|
| [0001](./0001-three-layer-component-architecture.md) | Three-Layer Component Architecture (Elements → Patterns → Blocks) | ✅ accepted | 2026-05 |
| [0001b](./0001-block-renderers-and-element-adapters.md) | Block Renderers and Element Adapters | ✅ accepted | 2026-05 |
| [0002](./0002-storybook-architecture-and-conventions.md) | Storybook Architecture and Conventions | ✅ accepted | 2026-05 |
| [0003](./0003-composable-content-model.md) | Composable Content Model Architecture | ✅ accepted | 2026-05 |
| [0004](./0004-contentful-renderers.md) | Contentful Renderers | ✅ accepted | 2026-06 |
| [0005](./0005-vitest-component-testing-strategy.md) | Vitest Component Testing Strategy | ✅ accepted | 2026-06-12 |
| [0006](./0006-playwright-e2e-strategy.md) | Playwright E2E Strategy | ✅ accepted | 2026-06-13 |
| [0007](./0007-playwright-production-setup.md) | Playwright Production Setup | ✅ accepted | 2026-06 |
| [0008](./0008-generic-composable-component-naming.md) | Generic Composable Component Naming | ✅ accepted | 2026-06 |
| [0009](./0009-navigation-links-array.md) | Navigation Links Array | ✅ accepted | 2026-06 |
| [0010](./0010-ci-cd-pipeline-architecture.md) | CI/CD Pipeline Architecture | ✅ accepted | 2026-06-18 |
| [0011](./0011-remove-aos-animation-library.md) | Remove AOS Animation Library | ✅ accepted | 2026-06 |
| [0012](./0012-motion-animation-strategy.md) | Motion Animation Strategy & Wrapper | ✅ accepted | 2026-06 |
| [0013](./0013-error-page-layout-strategy.md) | Error Page Layout Strategy | ✅ accepted | 2026-06 |
| [0014](./0014-advanced-motion-integration.md) | Advanced Motion Integration | ✅ accepted | 2026-06 |
| [0015](./0015-motion-components-in-element-layer.md) | Motion Components in Element Layer | ✅ accepted | 2026-06 |
| [0016](./0016-curated-static-icon-registry.md) | Curated Static Icon Registry | ✅ accepted | 2026-06-21 |
| [0017](./0017-animated-grid-card-physics.md) | Animated Grid Card Physics | ✅ accepted | 2026-06 |
| [0018](./0018-contentful-wrapper-components-and-taxonomy.md) | Contentful Wrapper Components and Model Taxonomy Alignment | 🔶 proposed | 2026-06-23 |
| [0019](./0019-legacy-space-cross-schema-content-migration.md) | Legacy Contentful Space → Composable Space: Cross-Schema Content Migration | ✅ accepted | 2026-09-06 |
| [0020](./0020-font-loading-and-typography-continuity-audit.md) | Font Loading and Typography Continuity Audit (master vs. develop-draft) | 🔶 proposed | 2026-09-07 |
| [0021](./0021-unit-component-test-coverage-remediation.md) | Unit & Component Test Coverage Remediation Plan | ✅ accepted | 2026-09-07 |
| [0022](./0022-e2e-journey-and-fixture-expansion.md) | E2E Journey Coverage & Synthetic Fixture Expansion | ✅ accepted | 2026-09-07 |
| [0023](./0023-ci-pipeline-parallelization.md) | CI Pipeline Parallelization & Branch-Name Correction | ✅ accepted | 2026-09-07 |
| [0024](./0024-storybook-runtime-fixes-and-cms-block-registry-expansion.md) | Storybook Runtime Fixes & CMS Block Registry Expansion | ✅ accepted | 2026-09-07 |
| [0025](./0025-motion-coverage-audit-and-error-page-redesign.md) | Motion Coverage Audit & Error Page Redesign | ✅ accepted | 2026-09-07 |
| [0026](./0026-timeline-tech-badges-meta-row.md) | TimelineEntry Tech-Badges Meta Row & TechBadgeCloud Layer Correction | ✅ accepted | 2026-09-08 |
| [0027](./0027-storybook-visual-bug-sweep-and-title-spacing.md) | Storybook Visual Bug Sweep and Story Title Spacing | ✅ accepted | 2026-09-09 |
| [0028](./0028-daisyui-expansion-footer-radial-carousel.md) | DaisyUI Component Library Expansion — Footer, Radial Progress, Carousel | ✅ accepted | 2026-09-09 |
| [0029](./0029-daisyui-expansion-phase-2-matrix-testimonials-mockups.md) | DaisyUI Component Library Expansion, Phase 2 — Skills Matrix, Testimonials, Mockup Gallery | ✅ accepted | 2026-09-09 |
| [0030](./0030-daisyui-expansion-phase-3-availability-timeline-breadcrumbs.md) | DaisyUI Component Library Expansion, Phase 3 — Availability Banner, Timeline, Breadcrumbs | ✅ accepted | 2026-09-10 |

---

## Key Decision Areas

### Component Architecture
- **[0001]** — Established the three-layer system (Elements → Patterns → Blocks) with pure adapter functions
- **[0008]** — Defined generic, domain-free naming rules for composable components

### CMS Integration
- **[0003]** — Replaced domain-specific Contentful types with a composable `ContentItem/ContentList` hierarchy
- **[0004]** — Defined how Contentful renderers bridge adapted data to UI Blocks
- **[0024]** — Fixed the `ui` field's silent-null default trap and expanded the `ContentSection`/`ContentList`
  Block registries from 1/4 reachable variants to 3/9, adding six new Blocks (FaqAccordion, MetricsStrip,
  ProcessSteps, ContentTabs, TechBadgeCloud, AnnouncementBanner) built from previously CMS-unreachable
  Elements/Patterns
- **[0028]** — DaisyUI catalog gap analysis (cross-checked against the project's own version-pinned skill,
  not the live marketing site); added a `PanelShowcaseWithRadialProgress` variant (`radial-progress`
  Element, same `subItems` data as `PanelShowcase`) and a new `Carousel` `ContentList` Block (closing
  the fixture's own long-unregistered placeholder). A `Footer` Block was also built to close a dead
  `footerText` data gap, but later removed by the repo owner after review — see the ADR's Amendment
- **[0029]** — Phase 2 of the same expansion: a `SkillsMatrix` table-layout variant of `PanelShowcase`,
  a `TestimonialWall` Block (`ChatBubble` Element + `ChatMessageRow` Pattern, quotes read from
  `description` not `body`), and a `MockupGallery` Block (`MockupBrowser`/`MockupCode`/`MockupPhone`
  Elements + `MockupShowcaseFrame` Pattern) — deliberately block-level, not per-item, framing to avoid
  a second live-schema-field cycle beyond simple `ui` enum additions
- **[0030]** — Phase 3, closing the roadmap: `AvailabilityBanner` (new `Status`/`Countdown` Elements,
  reusing `AnnouncementBanner`'s adapter shape and the already-fetched `startDate` field for a
  render-time — not live-ticking — countdown), a native-Timeline variant of `ProcessSteps`, and
  `Breadcrumbs`/`BreadcrumbTrail` built as tested but deliberately unused primitives (the site's flat
  routes have nowhere for a real trail to point yet). Fixed two real a11y bugs surfaced during the pass
  itself (invalid `aria-label` on a roleless `Status` span; an unlabeled icon in a Storybook mock)

### Testing
- **[0005]** — Vitest with jsdom, centralized mock factories, and colocated spec files
- **[0006]** — Playwright with MSW-mocked Contentful API and Block Object Models
- **[0007]** — Production Playwright configuration with browser caching
- **[0021]** — Coverage audit and remediation, implemented: adapters 4%→97% statements, app-code coverage floor enforced in CI at 75%/65% (currently ~92%/82%)
- **[0022]** — Full E2E journey suite implemented: synthetic fixture site, global chrome/navigation, per-block content journeys, routing/error surfaces, automated accessibility scanning, and a 6-project device matrix (Mobile Safari + tablet added)

### Animation
- **[0011]** — Removed AOS (CSS-class-based, incompatible with RSC)
- **[0012]** — Introduced `MotionWrapper` as the `"use client"` animation boundary
- **[0014]** — Advanced motion patterns (parallax, stagger, scroll progress)
- **[0015]** — Motion behavioral elements placed in the Element layer
- **[0017]** — Tactile spring physics for grid card animations
- **[0025]** — Audited every Block for motion coverage matched to its use case (stagger for lists, hover for
  interactive cards/icons, `AnimatePresence` for interaction-driven tab switches); redesigned `NotFoundBlock`/
  `ServerErrorBlock` onto the app's own `Icon`/`Button` components, fixing the actual cause of their visual
  inconsistency with the rest of the site

### Typography
- **[0020]** — Audited font-size/weight parity between deployed `master` and the `develop-draft` rewrite; found the component refactor preserved the type scale exactly, but flagged a real font-weight-loading fix (and a font-subset regression risk) in the shared `next/font` config

### Tooling & Infrastructure
- **[0002]** — Storybook v10 with `@storybook/nextjs-vite`, DaisyUI theme addon
- **[0010]** — Python-orchestrated CI/CD with Vercel native deployment
- **[0016]** — Curated static icon registry (reduced bundle from 575 kB to ~173 kB)
- **[0023]** — Replaced the single sequential CI job with parallel jobs + 4-way E2E sharding (~48 min → roughly a quarter of that on the slowest job); fixed release automation that hardcoded a nonexistent `main` branch instead of the repo's actual `master`
- **[0024]** — Found (via a live headless-browser render pass, not just a bundling check) and fixed the root
  cause of three components crashing in Storybook (a missing App Router mock flag); added a `storybook-a11y`
  CI job so a story that fails to render or fails accessibility is now actually caught

---

## How to Write a New ADR

1. Create a file: `docs/adr/NNNN-short-title.md`
2. Use this template:

```markdown
---
status: accepted
date: YYYY-MM-DD
---

# NNNN — Short Title

## Context

What is the problem or situation that necessitated this decision?

## Decision

What was decided?

## Considered Options

What alternatives were evaluated and why were they rejected?

## Consequences

### Positive
- ...

### Negative / Trade-offs
- ...
```

3. Add it to this index file.
4. Reference it from the relevant documentation chapter.
