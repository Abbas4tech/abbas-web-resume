import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

test.describe("E2E Smoke Test", () => {
  test("Loads the app with mocked layout and navigates", async ({
    page,
    header,
    sidebar,
  }) => {
    await page.goto("/");

    await expect(header.root).toBeVisible();

    await expect(sidebar.menuItems.first()).toBeVisible();
  });
});
