import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

const MOBILE_BREAKPOINT = 768;
const EXPERIENCE_PATH_PATTERN = /\/experience$/;

const NAV_PAGES = [
  { label: "About", path: "/about" },
  { label: "Experience", path: "/experience" },
  { label: "Projects", path: "/projects" },
  { label: "Skills", path: "/skills" },
  { label: "Experiments", path: "/experiments" },
] as const;

test.describe("Global chrome — header", () => {
  test("resume link opens the résumé in a new tab", async ({
    page,
    header,
  }) => {
    await page.goto("/about");

    await expect(header.resumeLink).toHaveAttribute(
      "href",
      "/ada-sparkline-resume.pdf"
    );
    await expect(header.resumeLink).toHaveAttribute("target", "_blank");
  });

  test("theme toggle switches the active theme", async ({
    page,
    themeToggle,
  }) => {
    await page.goto("/about");

    // The layout's `defaultTheme` is only applied to the DOM once a theme is
    // actively selected — `<html>` carries no `data-theme` attribute at all
    // until then, so the first assertion is on the *selected* theme.
    const html = page.locator("html");

    await themeToggle.selectTheme("dark");
    await expect(html).toHaveAttribute("data-theme", "dark");

    await themeToggle.selectTheme("synthwave");
    await expect(html).toHaveAttribute("data-theme", "synthwave");
  });
});

test.describe("Global chrome — sidebar navigation", () => {
  test.beforeEach(({ page }) => {
    const viewportWidth = page.viewportSize()?.width ?? 1280;
    // biome-ignore lint/suspicious/noSkippedTests: viewport-conditional — the sidebar is replaced by the BottomDock below the mobile breakpoint, not a disabled/pending test.
    test.skip(
      viewportWidth < MOBILE_BREAKPOINT,
      "Sidebar is replaced by the BottomDock below the mobile breakpoint."
    );
  });

  for (const { label, path } of NAV_PAGES) {
    const pathPattern = new RegExp(`${path}$`);

    test(`"${label}" nav item navigates to ${path} and highlights as active`, async ({
      page,
      sidebar,
    }) => {
      await page.goto("/about");

      await sidebar.clickNavItem(label);
      await expect(page).toHaveURL(pathPattern);
      expect(await sidebar.isActive(label)).toBe(true);
    });
  }
});

test.describe("Global chrome — bottom dock (mobile)", () => {
  test.beforeEach(({ page }) => {
    const viewportWidth = page.viewportSize()?.width ?? 1280;
    // biome-ignore lint/suspicious/noSkippedTests: viewport-conditional — the BottomDock only renders under the mobile breakpoint for the dock-on-mobile drawer variant, not a disabled/pending test.
    test.skip(
      viewportWidth >= MOBILE_BREAKPOINT,
      "BottomDock only renders under the mobile breakpoint for the dock-on-mobile drawer variant."
    );
  });

  test("surfaces every nav item and navigates on tap", async ({
    page,
    bottomDock,
  }) => {
    await page.goto("/about");

    await expect(bottomDock.root).toBeVisible();
    expect(await bottomDock.items.count()).toBe(6);

    await bottomDock.item("Experience").click();
    await expect(page).toHaveURL(EXPERIENCE_PATH_PATTERN);
  });
});
