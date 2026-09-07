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

---

## Key Decision Areas

### Component Architecture
- **[0001]** — Established the three-layer system (Elements → Patterns → Blocks) with pure adapter functions
- **[0008]** — Defined generic, domain-free naming rules for composable components

### CMS Integration
- **[0003]** — Replaced domain-specific Contentful types with a composable `ContentItem/ContentList` hierarchy
- **[0004]** — Defined how Contentful renderers bridge adapted data to UI Blocks

### Testing
- **[0005]** — Vitest with jsdom, centralized mock factories, and colocated spec files
- **[0006]** — Playwright with MSW-mocked Contentful API and Block Object Models
- **[0007]** — Production Playwright configuration with browser caching
- **[0021]** — Coverage audit and remediation, implemented: adapters 4%→97% statements, app-code coverage floor enforced in CI at 75%/65% (currently ~92%/82%)
- **[0022]** — Synthetic E2E fixture site, global chrome/navigation, per-block content journeys, routing/error surfaces, and automated accessibility scanning implemented (§2 groups 1-5); device-matrix expansion (group 6) still planned

### Animation
- **[0011]** — Removed AOS (CSS-class-based, incompatible with RSC)
- **[0012]** — Introduced `MotionWrapper` as the `"use client"` animation boundary
- **[0014]** — Advanced motion patterns (parallax, stagger, scroll progress)
- **[0015]** — Motion behavioral elements placed in the Element layer
- **[0017]** — Tactile spring physics for grid card animations

### Typography
- **[0020]** — Audited font-size/weight parity between deployed `master` and the `develop-draft` rewrite; found the component refactor preserved the type scale exactly, but flagged a real font-weight-loading fix (and a font-subset regression risk) in the shared `next/font` config

### Tooling & Infrastructure
- **[0002]** — Storybook v10 with `@storybook/nextjs-vite`, DaisyUI theme addon
- **[0010]** — Python-orchestrated CI/CD with Vercel native deployment
- **[0016]** — Curated static icon registry (reduced bundle from 575 kB to ~173 kB)

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
