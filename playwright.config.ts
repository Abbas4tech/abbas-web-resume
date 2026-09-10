import path from "node:path";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

// Load local environment variables if present
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

export default defineConfig({
  testDir: "./tests/e2e",
  /* Fails the whole run fast, with one clear message, if the server the
   * suite is about to hit isn't actually serving the mocked fixture — see
   * the file for why that can silently happen. */
  globalSetup: "./tests/e2e/global-setup.ts",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* One local retry as a safety net for the rare flake under heavy local
   * parallelism (see the `workers` comment) — CI gets two since it also
   * has to absorb runner-to-runner variance. */
  retries: process.env.CI ? 2 : 1,
  /* Locally, using every CPU core (Playwright's default) reliably produced
   * a couple of failures per full run on this machine — real interactions
   * timing out under contention from 6 projects' worth of browsers all
   * fighting for the same CPU, not application bugs (confirmed: clean in
   * isolation and under --workers=1). Capping at half the cores keeps local
   * runs fast while leaving enough headroom that a real regression doesn't
   * hide behind this same class of flake.
   *
   * CI runs fully serially (workers: 1) within a job on purpose — Playwright's
   * own CI guide recommends this for stability and getting parallelism from
   * *sharding across jobs* instead of raising in-job worker count on a
   * shared, small runner. The ~48-minute CI run this suite used to take was
   * dominated by retry overhead from the color-contrast false-positive rate
   * (documented below, test-base.ts), not real test time or a lack of
   * workers; with that fixed, ci.yml now shards the suite across 4 parallel
   * jobs instead. See ADR 0022 PR 10 (the now-superseded workers-bump
   * experiment) and ADR 0023 (the sharding fix). */
  workers: process.env.CI ? 1 : "50%",
  /* `blob` is Playwright's report format for sharded CI runs — each shard's
   * job uploads its own blob, and a separate merge job combines them into
   * one HTML report (see ci.yml). `github` adds inline PR annotations for
   * failures on top of that. Locally there's only ever one shard, so plain
   * `list` + `html` is simpler and browsable without a merge step. */
  reporter: process.env.CI ? [["blob"], ["github"]] : [["list"], ["html"]],

  /* Explicit timeouts */
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  /* Shared settings for all the projects below. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3000",

    /* Collect trace and video when tests fail. */
    trace: "retain-on-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      // Desktop WebKit doesn't emulate iOS Safari's viewport/touch/scroll
      // behavior — this is the only WebKit-engine *mobile* coverage.
      name: "Mobile Safari",
      use: { ...devices["iPhone 14"] },
    },
    {
      // A 768px-wide viewport: >= the 768px mobile breakpoint (so the
      // fixture's dock-on-mobile layout treats it as desktop — DrawerButton
      // renders instead of the BottomDock) but < the 1024px `lg` breakpoint
      // (so DrawerButton, `lg:hidden`, is still visible) — the one width
      // range where the toggleable off-canvas drawer is reachable at all.
      name: "Tablet",
      use: { ...devices["iPad Mini"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    // `src/contentful/lib/client.ts` now sets `cache: "no-store"`, so
    // Contentful fetches are never written to Next's on-disk Data Cache in
    // the first place — this clear is defense-in-depth against anything
    // else ever caching there, not the primary fix. (It used to be: a
    // GraphQL response cached from a previous *unmocked* run would silently
    // be served instead of MSW's fixture data — see ADR 0022.)
    command:
      "node -e \"require('fs').rmSync('.next/cache/fetch-cache',{recursive:true,force:true})\" && npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 240 * 1000,
    env: {
      NEXT_PUBLIC_API_MOCKING: "enabled",
    },
  },
});
