# Abbas Web Resume — Documentation

A personal resume/portfolio application built with **Next.js 14**, **Tailwind CSS v4**, **DaisyUI v5**, and **Contentful** as the headless CMS. Content is sourced via GraphQL and rendered through a strict three-layer component architecture.

---

## Documentation Chapters

| Chapter | Description |
|---------|-------------|
| [01 — Overview](./01-overview.md) | Project purpose, tech stack, and key design goals |
| [02 — Getting Started](./02-getting-started.md) | Prerequisites, installation, environment variables |
| [03 — Architecture](./03-architecture.md) | Three-layer component system, data flow, layer contracts |
| [04 — Dev Workflow](./04-dev-workflow.md) | Local development, scripts, branch strategy, changesets |
| [05 — Testing](./05-testing.md) | Vitest unit/component tests, Playwright E2E, MSW mocking |
| [06 — Storybook](./06-storybook.md) | Component explorer setup, addons, story conventions |
| [07 — Component Architecture](./07-component-architecture.md) | Elements, Patterns, Blocks catalog and naming rules |
| [08 — CMS Handling](./08-cms-handling.md) | Contentful content model, GraphQL codegen, adapters |
| [09 — Code Quality](./09-code-quality.md) | Ultracite/Biome, TypeScript, Husky git hooks |
| [10 — Deployment](./10-deployment.md) | Vercel hosting, CI/CD pipeline, environments |
| [11 — API Docs](./11-api-docs.md) | GraphQL schema, generated SDK, query patterns |
| [12 — Motion & Animation](./12-motion-animation.md) | Motion library strategy, behavioral elements, spring physics |
| [13 — ADR Index](./adr/README.md) | Architecture Decision Records index |

---

## Quick Reference

```bash
# Development
pnpm dev              # Next.js dev server → http://localhost:3000
pnpm storybook        # Storybook → http://localhost:6006

# Testing
pnpm test             # Vitest (watch mode)
pnpm test:run         # Vitest (single run)
pnpm test:e2e         # Playwright E2E

# Code Quality
pnpm fix              # Auto-fix lint & format (Biome)
pnpm check            # Dry-run lint & format check
pnpm generate         # Regenerate GraphQL TypeScript types

# Build
pnpm build            # Next.js production build
pnpm build-storybook  # Static Storybook build
```

---

## Where Things Live

```
.
├── src/
│   ├── app/                    # Next.js App Router pages & layouts
│   ├── components/
│   │   ├── elements/           # Layer 1: UI + Behavioral primitives
│   │   ├── patterns/           # Layer 2: Composed visual structures
│   │   ├── blocks/             # Layer 3: Page-slot compositions
│   │   └── contentful/         # CMS-aware block renderers
│   ├── contentful/             # GraphQL queries, adapters, codegen
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Shared utilities
│   └── types/                  # Global TypeScript types
├── tests/
│   ├── e2e/                    # Playwright E2E tests
│   ├── mocks/                  # Shared test factory functions
│   └── setup.tsx               # Global Vitest setup
├── docs/
│   ├── adr/                    # Architecture Decision Records
│   └── *.md                    # This documentation set
└── .storybook/                 # Storybook configuration
```
