# Chapter 01 — Overview

**Abbas Web Resume** is a personal portfolio and resume website showcasing work experience, skills, and projects. It serves as a production-grade reference implementation of a headless CMS-driven Next.js application with an emphasis on architectural clarity, component composability, and developer experience.

---

## Purpose

The application is designed to:

- Present professional experience, skills, and projects to potential employers and collaborators
- Act as a living demonstration of modern front-end engineering practices
- Serve as a testbed for architectural patterns (three-layer components, composable CMS models, MSW-backed E2E testing)

---

## Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Next.js (App Router) | `^14.2` |
| **Language** | TypeScript | `^5` |
| **Styling** | Tailwind CSS | `^4.1` |
| **Component Library** | DaisyUI | `^5.1` |
| **Animations** | Motion (formerly Framer Motion) | `^12.40` |
| **CMS** | Contentful (headless) | GraphQL API |
| **GraphQL Client** | graphql-request | `^7.4` |
| **Package Manager** | pnpm | `10.29.1` |
| **Hosting** | Vercel | Native integration |
| **Linting/Formatting** | Ultracite (Biome) | `^7.8` |
| **Unit Testing** | Vitest + Testing Library | `^4.1` |
| **E2E Testing** | Playwright | `^1.60` |
| **API Mocking** | MSW (Mock Service Worker) | `^2.14` |
| **Component Explorer** | Storybook | `^10.3` |
| **Visual Regression** | Chromatic | `^5.2` |
| **Versioning** | Changesets | `^2.31` |

---

## Key Design Goals

### 1. Strict Component Layer Separation

The component system is divided into three explicit, independently swappable layers:

```
Elements  ←  Patterns  ←  Blocks  ←  Pages
```

No upward imports. Data transformation happens only in `adapter.ts` files. See [Chapter 03 — Architecture](./03-architecture.md).

### 2. CMS-Driven Layout

Pages and their visual structure are entirely dictated by Contentful. The `ui` field on each `ContentList` and `ContentSection` entry controls which Block component gets rendered, enabling layout changes without frontend deploys.

### 3. Server-First with Selective Client Boundaries

Next.js App Router Server Components handle all data fetching. Client components (`"use client"`) are kept minimal and encapsulated inside Behavioral Elements (e.g., `MotionWrapper`, `FrozenRouter`).

### 4. Production-Quality Tooling

- **Zero-config linting**: Ultracite enforces strict Biome rules
- **Type-safe CMS**: GraphQL Codegen generates TypeScript types from the Contentful schema
- **Deterministic E2E tests**: MSW intercepts all Contentful API calls during testing
- **Changeset gating**: CI fails immediately if a PR is missing a changelog entry

---

## Repository Info

| Property | Value |
|----------|-------|
| **GitHub** | `Abbas4tech/abbas-web-resume` |
| **Version** | `4.2.0` |
| **Node** | `>=18` |
| **pnpm** | `>=10` |
| **Deployment** | Vercel (production + preview environments) |

---

## Next Steps

- [Getting Started →](./02-getting-started.md) — set up the project locally
- [Architecture →](./03-architecture.md) — understand the component system
