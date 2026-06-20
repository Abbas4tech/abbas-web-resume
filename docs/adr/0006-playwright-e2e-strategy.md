# 6. Playwright E2E Strategy

Date: 2026-06-13

## Status

Accepted

## Context

We need to introduce a robust end-to-end (E2E) automation testing suite to complement our existing Vitest component testing architecture (as defined in ADR 0005). Given that our application's layout and content are entirely driven by a headless CMS (Contentful) via GraphQL, running traditional E2E tests against live endpoints introduces flakiness, latency, and requires maintaining an ever-syncing "testing" workspace in Contentful. Furthermore, our application is built around a strict three-layer component architecture (Elements, Patterns, Blocks), meaning our E2E locators and testing patterns should reflect this modularity rather than relying on monolithic page definitions.

## Decisions

1. **Framework Scope**: We will use Playwright strictly for full-page user flows, routing validation, and visual regression testing. We will explicitly avoid using Playwright's experimental component testing feature to prevent fragmentation with our existing Vitest setup.
2. **Network Mocking over Live Endpoints**: We will intercept all Contentful GraphQL requests using Playwright's network routing (`page.route`) and mock the responses. E2E tests will not hit live Contentful endpoints. This guarantees determinism and speed.
3. **Reusing Vitest Factories**: The mocked JSON payloads returned by Playwright's network interceptors will be generated using the exact same centralized factory functions (`src/test/mocks/`) that were established for Vitest. This ensures that our E2E data shapes remain strictly in sync with our component testing data shapes.
4. **Block Object Models**: Instead of traditional Page Object Models (POMs) mapped to URL routes, we will implement **Block Object Models**. Since our layouts are composed of generic, reusable UI Blocks (e.g., `HeroBanner`, `SidebarNav`, `AppHeader`), our test classes will map 1:1 with these Blocks. A test script will compose these Block Object Models on the fly depending on what the mock data dictates is rendered on the page.

## Consequences

- **Pros**:
  - Tests will be deterministic, lightning-fast, and completely resilient to external network failures or CMS data mutations.
  - Test structures will naturally reflect our application's UI architecture, improving maintainability.
  - Centralizing mock data generation prevents duplication of effort between unit/component tests and E2E tests.
- **Cons**:
  - We sacrifice true "end-to-end" integration validation of the Contentful API itself. If Contentful changes their schema or delivery structure, these tests will still pass because they are heavily mocked. This risk must be mitigated through automated schema validation or dedicated API smoke tests outside this suite.
