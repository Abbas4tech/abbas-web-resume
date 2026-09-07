import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

const MOBILE_BREAKPOINT = 768;
const ABOUT_PATH_PATTERN = /\/about$/;

test.describe("E2E Smoke Test", () => {
  test("Loads the app with the mocked fixture layout", async ({
    page,
    header,
  }) => {
    await page.goto("/");

    // `src/middleware.ts` redirects "/" to "/about" unconditionally.
    await expect(page).toHaveURL(ABOUT_PATH_PATTERN);
    await expect(page.locator("main").first()).toBeVisible();

    await expect(header.root).toBeVisible();
    expect(await header.getTitle()).toBe("Ada Sparkline");

    // The page heading and hero avatar prove the mocked GraphQL fixture (not
    // just an empty shell) actually reached the render tree.
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
    await expect(
      page.getByRole("img", { name: "Ada Sparkline avatar illustration" })
    ).toBeVisible();
  });

  test("navigation surfaces the full fixture nav depending on viewport", async ({
    page,
    sidebar,
  }) => {
    await page.goto("/");

    const viewportWidth = page.viewportSize()?.width ?? 1280;

    if (viewportWidth < MOBILE_BREAKPOINT) {
      // Layout is fixed to the "dock-on-mobile" drawer variant, so the
      // sidebar is replaced by the BottomDock below this breakpoint.
      await expect(page.locator(".dock").first()).toBeVisible();
    } else {
      await expect(sidebar.menuItems.first()).toBeVisible();
      expect(await sidebar.getNavItemsCount()).toBe(6);
    }
  });
});
