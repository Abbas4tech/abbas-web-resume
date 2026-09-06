# Chapter 05 — Testing

This project uses a dual-testing strategy: fast component/unit tests with **Vitest**, and full browser E2E tests with **Playwright**. Both share the same mock data factory functions.

---

## Testing Stack

| Tool | Role |
|------|------|
| **Vitest** | Unit & component tests (fast, TypeScript-native) |
| **@testing-library/react** | DOM rendering & interaction helpers |
| **jsdom** | Browser DOM simulation for Vitest |
| **MSW (Mock Service Worker)** | Intercepts Contentful API calls in both environments |
| **Playwright** | E2E browser automation (Chromium, Firefox, WebKit) |
| **axe-playwright** | Automated accessibility checks inside E2E tests |
| **@storybook/addon-vitest** | Runs story-based tests inside Vitest |

---

## Unit & Component Tests (Vitest)

### Configuration

```ts
// vitest.config.ts
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.tsx"],
    include: ["src/**/*.spec.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.mock.ts", "src/**/*.stories.tsx"],
    },
  },
});
```

### What Is Tested

- **Elements**: Render output, props handling, a11y attributes
- **Patterns**: Composition correctness, adapter output
- **Blocks**: Full subtree render with mock data
- **Contentful renderers**: Adapter functions and component mapping
- **Adapters**: Pure function input → output correctness

### File Colocation

Tests live alongside the code they test:

```
button/
├── button.tsx
└── button.spec.tsx     ← colocated test
```

### Global Setup (`tests/setup.tsx`)

The setup file stubs Next.js App Router APIs globally so individual tests don't need to mock them:

- `next/navigation` — `useRouter`, `usePathname`, `useSearchParams`
- `next/image` — renders as a plain `<img>` in tests
- `next/link` — renders as a plain `<a>` in tests

### Mock Factories (`tests/mocks/`)

Centralized factory functions generate type-safe mock objects for complex Contentful types. This isolates tests from verbose auto-generated GraphQL schema shapes.

```ts
// Usage in a spec file
import { makeMockContentItem } from "@/tests/mocks/content-item.factory";

const item = makeMockContentItem({ title: "My Job" });
```

> **Important:** When the Contentful schema changes, update the factories — otherwise tests pass on stale data shapes.

### Running Tests

```bash
pnpm test           # Watch mode (re-runs on file changes)
pnpm test:run       # Single run (CI-friendly)
pnpm test:coverage  # Single run with V8 coverage report
pnpm test:ui        # Vitest interactive UI browser
```

Coverage reports are written to `coverage/` and uploaded as CI artifacts.

---

## E2E Tests (Playwright)

### Configuration

```ts
// playwright.config.ts highlights
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox",  use: { ...devices["Desktop Firefox"] } },
    { name: "webkit",   use: { ...devices["Desktop Safari"] } },
    { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    env: { NEXT_PUBLIC_API_MOCKING: "enabled" },
  },
});
```

### Network Mocking Strategy

Because Contentful data is fetched on the server inside Next.js Server Components, browser-level `page.route()` interception is insufficient. The application uses **MSW at the Node.js server level**:

1. `NEXT_PUBLIC_API_MOCKING=enabled` activates MSW in the Next.js server process
2. MSW intercepts all outgoing GraphQL requests to Contentful
3. Predetermined responses (built from the shared factory functions) are returned
4. Tests run against a fully deterministic, CMS-independent data set

This means:
- ✅ Tests never hit live Contentful
- ✅ Tests pass without valid API credentials
- ✅ Layout changes in Contentful don't break tests
- ⚠️ True Contentful API changes (schema updates) won't be caught here

### Block Object Models

Instead of page-centric Page Object Models (POMs), this project uses **Block Object Models** (BOMs). Each BOM maps 1:1 with a UI Block:

```ts
// tests/e2e/models/app-header.model.ts
export class AppHeaderModel {
  constructor(private page: Page) {}

  get nav() { return this.page.getByRole("navigation"); }
  async clickNavItem(label: string) {
    await this.nav.getByRole("link", { name: label }).click();
  }
}
```

Test files compose BOMs dynamically based on the mock data injected:

```ts
test("navigates to experience page", async ({ page }) => {
  const header = new AppHeaderModel(page);
  await page.goto("/");
  await header.clickNavItem("Experience");
  await expect(page).toHaveURL("/experience");
});
```

### Running E2E Tests

```bash
pnpm test:e2e           # Headless, all browsers
pnpm test:e2e:ui        # Interactive Playwright UI
pnpm test:e2e:debug     # Inspector (step-through)
pnpm test:e2e:codegen   # Record new tests by clicking
```

Playwright reports are written to `playwright-report/` and uploaded as CI artifacts.

---

## Accessibility Testing

**Component level**: Testing Library queries encourage semantic, accessible markup by using `getByRole`, `getByLabel`, etc.

**E2E level**: `axe-playwright` runs automated accessibility audits against full page renders:

```ts
import { checkA11y } from "axe-playwright";

test("homepage is accessible", async ({ page }) => {
  await page.goto("/");
  await checkA11y(page);
});
```

---

## Storybook Test Runner

`@storybook/addon-vitest` and `@storybook/test-runner` can execute story-based interaction tests. Stories serve as light visual regression checkpoints and are compiled as part of the CI `pnpm build-storybook` step.

---

## Known Gaps & Remediation Plan

An audit on 2026-09-07 found unit/component coverage at ~26% statements (concentrated gaps: the core Contentful
adapters in `src/contentful/adapters/` are almost entirely untested at ~4%, and `rich-text.tsx` under-covers its
node-type mapping), one pre-existing failing adapter spec with swapped mock fixtures, and an E2E suite
consisting of two smoke-level specs against a single, near-empty mock page. See
[ADR 0021](./adr/0021-unit-component-test-coverage-remediation.md) and
[ADR 0022](./adr/0022-e2e-journey-and-fixture-expansion.md) for the full findings and the proposed, phased
remediation plan (not yet implemented).

## Related ADRs

- [ADR 0005 — Vitest Component Testing Strategy](./adr/0005-vitest-component-testing-strategy.md)
- [ADR 0006 — Playwright E2E Strategy](./adr/0006-playwright-e2e-strategy.md)
- [ADR 0007 — Playwright Production Setup](./adr/0007-playwright-production-setup.md)
- [ADR 0021 — Unit & Component Test Coverage Remediation Plan](./adr/0021-unit-component-test-coverage-remediation.md)
- [ADR 0022 — E2E Journey Coverage & Synthetic Fixture Expansion](./adr/0022-e2e-journey-and-fixture-expansion.md)
