import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

const MOBILE_BREAKPOINT = 768;

test.describe("E2E Smoke Test", () => {
  test("Loads the app with the mocked fixture layout", async ({
    page,
    header,
  }) => {
    await page.goto("/");

    await expect(header.root).toBeVisible();
    expect(await header.getTitle()).toBe("Ada Sparkline");
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
