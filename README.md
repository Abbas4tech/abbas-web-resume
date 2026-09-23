<img width="1366" height="957" alt="Abbas Web Resume screenshot" src="https://github.com/user-attachments/assets/adb153f3-1ef4-489c-8cd4-cdc53c728f58" />

# Abbas Web Resume

A personal resume/portfolio site built on **Next.js 14**, **Tailwind CSS v4**, and **DaisyUI v5**, with **Contentful** as a headless CMS driving both content *and* page layout over GraphQL.

[![CI](https://github.com/Abbas4tech/abbas-web-resume/actions/workflows/ci.yml/badge.svg)](https://github.com/Abbas4tech/abbas-web-resume/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-06B6D4?logo=tailwindcss)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm)
![Storybook](https://img.shields.io/badge/Storybook-10-FF4785?logo=storybook)

---

## Overview

The app presents work experience, skills, and projects, and doubles as a reference implementation of a CMS-driven Next.js app: a strict three-layer component architecture, a Contentful schema that controls layout (not just content), and a testing stack (Vitest, Playwright, Storybook, Chromatic) wired for deterministic CI.

## Features

- **CMS-driven layout** — the `ui` field on Contentful entries selects which Block renders, so layout changes ship without a frontend deploy
- **Three-layer component system** — `Elements → Patterns → Blocks`, with adapters as the only layer aware of Contentful's shape
- **Server-first rendering** — data fetching lives in Server Components; client boundaries are limited to Behavioral Elements (e.g. motion, routing)
- **Typed CMS access** — GraphQL Codegen generates types straight from the live Contentful schema
- **Deterministic E2E tests** — Playwright + MSW intercept Contentful calls at the network layer, so E2E runs never depend on live data
- **Componentized in isolation** — every Element/Pattern/Block has a Storybook story, checked for accessibility via `axe-playwright` and visually regression-tested via Chromatic
- **Changeset-gated CI** — pull requests must carry a changeset before merge

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + DaisyUI v5 |
| Animation | Motion (formerly Framer Motion) |
| CMS | Contentful (headless, GraphQL) |
| GraphQL client | graphql-request + GraphQL Codegen |
| Package manager | pnpm 10 |
| Hosting | Vercel |
| Linting/formatting | Ultracite (Biome) |
| Unit/component tests | Vitest + Testing Library |
| E2E tests | Playwright + MSW |
| Component explorer | Storybook 10 |
| Visual regression | Chromatic |
| Versioning | Changesets |

## Architecture

```
Elements  ←  Patterns  ←  Blocks  ←  Pages
```

- **Elements** (`src/components/elements/`) — no domain meaning, split into UI wrappers (DaisyUI classes) and Behavioral helpers (motion, routing)
- **Patterns** (`src/components/patterns/`) — reusable visual structures composed from Elements, still domain-agnostic
- **Blocks** (`src/components/blocks/`) — occupy a named layout slot (header, hero, sidebar); independent of Contentful, typed with plain TypeScript
- **Adapters** (`src/contentful/adapters/`) — the only layer that knows about Contentful's shape; transform CMS entries into Block/Pattern props
- **Contentful wrappers** (`src/components/contentful/`) — map CMS layout identifiers to the Block to mount

A lower layer never imports from a higher one. See [`CONTEXT.md`](./CONTEXT.md) for the full vocabulary and [`docs/03-architecture.md`](./docs/03-architecture.md) for the deep dive.

## Project Structure

```
.
├── src/
│   ├── app/                # Next.js App Router pages & layouts
│   ├── components/
│   │   ├── elements/        # Layer 1 — UI + Behavioral primitives
│   │   ├── patterns/         # Layer 2 — composed visual structures
│   │   ├── blocks/           # Layer 3 — page-slot compositions
│   │   └── contentful/       # CMS-aware block renderers
│   ├── contentful/          # GraphQL queries, adapters, codegen output
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Shared utilities
│   └── types/                 # Global TypeScript types
├── tests/
│   ├── e2e/                  # Playwright E2E tests
│   └── mocks/                 # Shared MSW/test factories
├── docs/                      # Full documentation set (chapters + ADRs)
└── .storybook/                 # Storybook configuration
```

## Getting Started

**Prerequisites:** Node 18+, pnpm 10+, a Contentful account.

```bash
git clone https://github.com/Abbas4tech/abbas-web-resume.git
cd abbas-web-resume
pnpm install
cp .env.example .env.local   # fill in Contentful credentials
pnpm contentful:setup        # bootstrap the content model (fresh spaces only)
pnpm generate                # generate GraphQL types from the schema
pnpm dev                     # → http://localhost:3000
```

Full walkthrough, including the required environment variables: [`docs/02-getting-started.md`](./docs/02-getting-started.md).

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the Next.js dev server |
| `pnpm build` / `pnpm start` | Production build / serve |
| `pnpm storybook` | Storybook at `http://localhost:6006` |
| `pnpm test` / `pnpm test:run` | Vitest — watch / single run |
| `pnpm test:e2e` | Playwright E2E tests |
| `pnpm check` / `pnpm fix` | Lint & format check / auto-fix (Biome via Ultracite) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm generate` | Regenerate GraphQL types from the Contentful schema |
| `pnpm contentful:setup` | Bootstrap the Contentful content model |
| `pnpm ci:local` | Run the full local CI sequence (check, typecheck, tests, build) |

See [`docs/README.md`](./docs/README.md#quick-reference) for the complete list.

## Testing

- **Unit/component** — Vitest + Testing Library, mounting a single Element/Pattern/Block in jsdom
- **E2E** — Playwright, with Contentful responses mocked via MSW at the Node server level, using Block Object Models rather than fixed Page Object Models (since layout is CMS-driven)
- **Visual/accessibility** — every Storybook story is checked with `axe-playwright` and screenshot-tested via Chromatic

Details: [`docs/05-testing.md`](./docs/05-testing.md).

## Documentation

Full documentation set lives in [`docs/`](./docs/README.md):

| Chapter | Covers |
|---|---|
| [01 — Overview](./docs/01-overview.md) | Purpose, tech stack, design goals |
| [02 — Getting Started](./docs/02-getting-started.md) | Install, environment variables, first run |
| [03 — Architecture](./docs/03-architecture.md) | Three-layer component system, data flow |
| [04 — Dev Workflow](./docs/04-dev-workflow.md) | Local development, branch strategy, changesets |
| [05 — Testing](./docs/05-testing.md) | Vitest, Playwright, MSW |
| [06 — Storybook](./docs/06-storybook.md) | Component explorer, addons, story conventions |
| [07 — Component Architecture](./docs/07-component-architecture.md) | Elements/Patterns/Blocks catalog, naming rules |
| [08 — CMS Handling](./docs/08-cms-handling.md) | Content model, GraphQL codegen, adapters |
| [09 — Code Quality](./docs/09-code-quality.md) | Ultracite/Biome, TypeScript, Husky hooks |
| [10 — Deployment](./docs/10-deployment.md) | Vercel hosting, CI/CD, environments |
| [11 — API Docs](./docs/11-api-docs.md) | GraphQL schema, generated SDK |
| [12 — Motion & Animation](./docs/12-motion-animation.md) | Motion strategy, spring physics |
| [ADR Index](./docs/adr/README.md) | Architecture Decision Records |

## Contributing

- All PRs require a [changeset](https://github.com/changesets/changesets) (`pnpm changeset`) — CI blocks merge without one
- Run `pnpm fix` before committing; Husky runs lint/format checks on commit
- Follow the component vocabulary in [`CONTEXT.md`](./CONTEXT.md) — layer naming and dependency rules are enforced by convention, not just tooling
- CI runs lint, typecheck, unit tests, E2E, and both app + Storybook builds as parallel jobs on every PR (see [`docs/04-dev-workflow.md`](./docs/04-dev-workflow.md))

## License

Personal project — not currently licensed for reuse.
