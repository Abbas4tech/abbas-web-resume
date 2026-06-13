# 7. Playwright Production Best Practices & Setup

Date: 2026-06-14

## Status

Accepted

## Context

Following ADR 0006 (Playwright E2E Strategy), we established the concrete folder structure, configuration, and CI/CD pipeline to ensure our Playwright testing suite is production-ready. However, during implementation, we discovered that **Next.js App Router fetches data on the server side** via React Server Components (RSC), which Playwright's browser-level `page.route` cannot intercept. To solve this, we integrated **Mock Service Worker (MSW)** at the Node.js server level.

## Decisions

### 1. Project Structure
We will adopt a scalable directory structure under `tests/` and `src/mocks/`:
- `tests/e2e/`: Actual test specifications.
- `tests/e2e/models/`: Page and Block Object Models.
- `tests/e2e/fixtures/`: Custom Playwright fixtures for setup/teardown.
- `src/mocks/`: MSW handlers and server initialization.

### 2. Configuration Enhancements (`playwright.config.ts`)
We will configure Playwright for optimal CI execution and local debugging. This includes explicit timeouts, artifacts retention, and multiple reporters. We also inject `NEXT_PUBLIC_API_MOCKING: "enabled"` into the Next.js `webServer` to trigger MSW.

#### Snippet: Playwright Configuration
```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["html"]] : [["list"], ["html"]],
  
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 240 * 1000, // accommodate slow initial Next.js builds
    env: {
      NEXT_PUBLIC_API_MOCKING: "enabled",
    },
  },
});
```

### 3. Server-Side Mocking (MSW)
To mock data fetching within Next.js Server Components, we use MSW's Node.js interceptor. We hook into Next.js using `instrumentation.ts`.

#### Snippet: Next.js Instrumentation
```typescript
// src/instrumentation.ts
export async function register() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    if (process.env.NEXT_RUNTIME === "nodejs") {
      const { server } = await import("./mocks/server");
      server.listen();
    }
  }
}
```

#### Snippet: MSW Handlers
```typescript
// src/mocks/handlers.ts
import { graphql, HttpResponse } from "msw";

export const mockLayoutData = { /* ... accurate schema fragments ... */ };

export const handlers = [
  graphql.query("GetLayout", () => {
    return HttpResponse.json({ data: mockLayoutData.GetLayout });
  }),
  graphql.query("GetPageByPath", () => {
    return HttpResponse.json({ data: mockLayoutData.GetPageByPath });
  }),
];
```

### 4. Page / Block Object Models (POM)
We encapsulate selectors and actions within object models. This separates test logic from UI implementation details.

#### Snippet: Base Object Model
```typescript
// tests/e2e/models/AppHeaderModel.ts
import { type Locator, type Page } from "@playwright/test";

export class AppHeaderModel {
  public readonly root: Locator;

  constructor(public readonly page: Page) {
    this.root = page.locator("header");
  }
}
```

### 5. CI/CD Integration
We run tests automatically on GitHub Actions, uploading artifacts (traces, videos, reports) for failure analysis.

#### Snippet: GitHub Actions Workflow
```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## Consequences

- **Pros:**
  - High confidence in E2E tests accurately representing SSR architecture without needing live Contentful data.
  - Clear separation of concerns with POM and native MSW Node interceptors.
  - Robust CI runs with explicit timeouts and artifacts.
- **Cons:**
  - Mock data structures must rigorously match GraphQL schema fragments so Contentful SDK adapters don't crash.
  - Requires `experimental: { instrumentationHook: true }` in Next.js 14.
