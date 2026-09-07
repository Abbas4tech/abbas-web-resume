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
      exclude: [
        "src/**/*.mock.ts",
        "src/**/*.stories.tsx",
        "src/contentful/generated/**", // auto-generated GraphQL SDK
        "src/contentful/scripts/**", // one-off Contentful migration/setup CLI tools
      ],
      thresholds: {
        statements: 75,
        lines: 75,
        branches: 65,
      },
    },
  },
});
```

The coverage floor above is a regression guard, not an aspirational target — application code (after the generated SDK and migration scripts are excluded) already measures at ~92% statements / ~82% branches. It's expected to be ratcheted up over time as new code lands with tests already attached, per [ADR 0021](./adr/0021-unit-component-test-coverage-remediation.md) §3.

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

### Contentful Fixtures in Adapter/Component Specs

In practice, Vitest specs for Contentful adapters and renderers build their mock data **inline, colocated with the test**, typed against the generated GraphQL fragment types (`*FieldsFragment` from `src/contentful/generated/`) rather than a separate factory module. This keeps each spec self-contained and lets TypeScript catch a schema drift immediately (a renamed or removed field fails to typecheck).

```ts
// content-item.spec.ts
import type { ContentItemFieldsFragment } from "../generated/contentful-sdk.generated";

const fullContentItem = {
  __typename: "ContentItem",
  sys: { id: "job-1" },
  title: "Senior Frontend Engineer",
  // ...only the fields the adapter actually reads
} as unknown as ContentItemFieldsFragment;
```

Recursive/deeply-nested fragment fields (e.g. rich text's `body.links`) are supplied with a minimal shape and cast via `as unknown as <FragmentType>` rather than fully satisfying the generated union — the goal is a realistic fixture for the adapter under test, not a byte-for-byte GraphQL response.

`tests/mocks/factories.ts` now exports the schema-typed factories used to build the Playwright E2E fixture site described in [ADR 0022](./adr/0022-e2e-journey-and-fixture-expansion.md) (`tests/mocks/fixture-site.ts`) — Vitest specs still prefer the fully-inline style shown above rather than importing these factories, since each adapter spec typically only needs one or two fields overridden.

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

### Local Setup (one-time)

Playwright's browser binaries aren't installed by `pnpm install` — run this once per machine before `pnpm test:e2e` works locally:

```bash
pnpm test:e2e:install   # playwright install --with-deps
```

CI does this itself on every run (see `.github/workflows/ci.yml`), so this is a local-only step.

### Configuration

```ts
// playwright.config.ts highlights
export default defineConfig({
  testDir: "./tests/e2e",
  globalSetup: "./tests/e2e/global-setup.ts",
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
    // Defense-in-depth only — src/contentful/lib/client.ts sets
    // `cache: "no-store"` on every Contentful fetch, so nothing should ever
    // land in .next/cache/fetch-cache in the first place. See ADR 0022's
    // Implementation section (PR 6) for why that's the real fix and this
    // clear alone wasn't enough.
    command:
      "node -e \"require('fs').rmSync('.next/cache/fetch-cache',{recursive:true,force:true})\" && npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    env: { NEXT_PUBLIC_API_MOCKING: "enabled" },
  },
});
```

### No caching on Contentful fetches (`cache: "no-store"`)

`src/contentful/lib/client.ts` passes `cache: "no-store"` when constructing the `GraphQLClient`, which `graphql-request` forwards straight into the underlying `fetch()` call. Without it, Next.js's default fetch Data Cache would cache every Contentful response indefinitely (in production, meaning a content edit might never appear without a redeploy) and persist it to `.next/cache/fetch-cache` across dev-server restarts (in development, meaning a stale response — real *or* mocked — could silently leak into an unrelated run). This was found via the E2E fixture site diverging sharply enough from real content to make a stale-cache hit obvious; see ADR 0022 for the full story.

### The Fixture Guard (`tests/e2e/global-setup.ts`)

`reuseExistingServer: !process.env.CI` means that locally, if anything is already listening on port 3000 — most commonly a plain `next dev` left running from unrelated work, or even one Playwright itself started for a previous run — Playwright reuses it as-is and never runs `webServer.command` (or its `NEXT_PUBLIC_API_MOCKING=enabled`) at all. A server started that way serves real Contentful content instead of the fixture, and every test that expects fixture content would fail in confusing, hard-to-place ways with no single obvious cause.

`globalSetup` requests `/about` before the suite starts and asserts the fixture's fictional persona name ("Ada Sparkline") appears in the response. If it doesn't, the whole run fails immediately with one specific error telling you to stop the stray server — instead of a scattered handful of assertion failures across unrelated spec files. If your local `pnpm test:e2e` run fails at this step, that's the fix: stop whatever's already running on port 3000 and re-run.

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
pnpm test:e2e:install   # One-time: download browser binaries
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

An audit on 2026-09-07 found unit/component coverage at ~21.6% statements (concentrated gaps: only 2 of the 13
files in `src/contentful/adapters/` had their own spec, and `rich-text.tsx` under-covered its node-type mapping)
and an E2E suite consisting of two smoke-level specs against a single, near-empty mock page.

**Unit/component side — done.** [ADR 0021](./adr/0021-unit-component-test-coverage-remediation.md)'s full P0/P1/P2
backlog has landed: the Contentful adapters, the `ContentSection`/`ContentList` block registries, `rich-text.tsx`'s
node-type mapping, the motion/behavioral elements, and `theme-toggle`/`drawer`'s branch coverage are all tested.
Application code (excluding the generated GraphQL SDK and migration scripts) now measures ~92% statements / ~82%
branches, enforced by the coverage floor documented above.

**E2E side — fixture, navigation, per-block, and routing/error journeys done, accessibility/device-matrix not
started.** [ADR 0022](./adr/0022-e2e-journey-and-fixture-expansion.md)'s synthetic fixture site (§2 group 1),
global chrome/navigation journeys (§2 group 2), per-block content journeys (§2 group 3), and routing/error
surfaces (§2 group 4) are implemented: `tests/mocks/fixture-site.ts` serves a fictional multi-page site
exercising every registered Block, routed by path through `tests/mocks/handlers.ts`;
`tests/e2e/navigation.spec.ts` covers the header and sidebar/BottomDock navigation; a spec per Block
(`hero-banner`, `split-content-panel`, `timeline-section`, `card-grid`, `panel-showcase`) asserts against that
fixture content; and `tests/e2e/routing.spec.ts` covers direct navigation, the real `notFound()` branch, and
the `error.tsx` boundary (the last one exercised by a sentinel path the mock handler answers with a GraphQL
error response). Accessibility and the expanded device matrix (groups 5-6) are still just a plan.

## Related ADRs

- [ADR 0005 — Vitest Component Testing Strategy](./adr/0005-vitest-component-testing-strategy.md)
- [ADR 0006 — Playwright E2E Strategy](./adr/0006-playwright-e2e-strategy.md)
- [ADR 0007 — Playwright Production Setup](./adr/0007-playwright-production-setup.md)
- [ADR 0021 — Unit & Component Test Coverage Remediation Plan](./adr/0021-unit-component-test-coverage-remediation.md)
- [ADR 0022 — E2E Journey Coverage & Synthetic Fixture Expansion](./adr/0022-e2e-journey-and-fixture-expansion.md)
