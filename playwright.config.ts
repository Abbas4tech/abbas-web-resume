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
  /* CI runs one worker at a time (its own comment below). Locally, using
   * every CPU core (Playwright's default) reliably produced a couple of
   * failures per full run on this machine — real interactions timing out
   * under contention from 6 projects' worth of browsers all fighting for
   * the same CPU, not application bugs (confirmed: clean in isolation and
   * under --workers=1). Capping at half the cores keeps local runs fast
   * while leaving enough headroom that a real regression doesn't hide
   * behind this same class of flake. See ADR 0022 PR 10. */
  workers: process.env.CI ? 1 : "50%",
  /* Reporter to use. Use GitHub reporter in CI */
  reporter: process.env.CI ? [["github"], ["html"]] : [["list"], ["html"]],

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
