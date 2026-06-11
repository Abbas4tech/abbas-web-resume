# 5. Vitest Component Testing Strategy

Date: 2026-06-12

## Status

Accepted

## Context

We need a fast, reliable testing framework for our React components and adapters. This project uses a strict three-layer architecture (Elements, Patterns, Blocks) and relies heavily on TypeScript and Contentful GraphQL schemas. We needed to choose a testing framework, a DOM environment, and a standardized mocking strategy for our complex domain types.

## Decisions

1. **Testing Framework**: We will use **Vitest** instead of Jest. It natively understands Vite configurations (which we use for Storybook) and offers faster execution with out-of-the-box TypeScript support.
2. **DOM Environment**: We will use **jsdom** for our test environment to ensure robust compatibility with `@testing-library/react`, rather than the faster but less-standard `happy-dom`. This aligns with our accessibility priorities (`axe-playwright`).
3. **Contentful Mocks**: We will use **centralized factory functions** (in `src/test/mocks/`) to generate mock data for our adapters. This isolates the tests from the verbose, heavily nested nature of the auto-generated GraphQL schema.
4. **Next.js Global Stubs**: We will establish global stubs for Next.js App Router features (like `next/navigation` and `<Image>`) in a single `src/test/setup.ts` file. This prevents boilerplate `vi.mock` calls from cluttering every component test.
5. **Colocation**: Test files must be colocated with their target code. A component `[name].tsx` will have a `[name].spec.tsx` test file, and its adapter `[name].adapter.ts` will have a `[name].adapter.spec.ts` file.

## Consequences

- **Pros**: The tests will run quickly and natively support ESM/TS. The test files themselves will remain clean and focused on UI logic, unpolluted by verbose mock structures or repetitive Next.js polyfills.
- **Cons**: We introduce an initial setup complexity by needing centralized factories and global stubs. Developers must remember to update the factories when the Contentful schema changes, rather than finding out via localized test failures.
