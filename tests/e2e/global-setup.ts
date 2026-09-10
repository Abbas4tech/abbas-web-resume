import type { FullConfig } from "@playwright/test";

const FIXTURE_MARKER = "Ada Sparkline";
const GUARD_PATH = "/about";

/**
 * Runs once before the whole E2E suite, against whatever server
 * `webServer` resolved to — including one Playwright *reused* instead of
 * starting (`reuseExistingServer: !process.env.CI`), which skips
 * `webServer.command` (and the fetch-cache clear + `NEXT_PUBLIC_API_MOCKING`
 * env var it sets) entirely.
 *
 * If that reused server is a plain `next dev` someone left running for
 * unrelated work, every test would silently run against real Contentful
 * content instead of the mocked fixture — failing in confusing,
 * hard-to-place ways rather than one clear error. This checks for the
 * fixture's fictional persona up front and fails fast with a specific
 * explanation instead.
 */
export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0]?.use?.baseURL ?? "http://localhost:3000";

  let html: string;
  try {
    const response = await fetch(`${baseURL}${GUARD_PATH}`, {
      redirect: "follow",
    });
    html = await response.text();
  } catch (error) {
    throw new Error(
      `E2E fixture guard: could not reach ${baseURL}${GUARD_PATH} before the suite started. ` +
        "Is the dev server actually up? See webServer in playwright.config.ts.",
      { cause: error }
    );
  }

  if (!html.includes(FIXTURE_MARKER)) {
    throw new Error(
      `E2E fixture guard: ${GUARD_PATH} did not render the mocked fixture site (expected to find ` +
        `"${FIXTURE_MARKER}" in the page). This almost always means Playwright reused an already-running ` +
        "dev server instead of starting its own (see reuseExistingServer in playwright.config.ts) — one " +
        "started without NEXT_PUBLIC_API_MOCKING=enabled serves real Contentful content instead of the " +
        "fixture, and every test that expects fixture content will fail. Stop any `next dev` process " +
        "already bound to this port and re-run."
    );
  }
}
