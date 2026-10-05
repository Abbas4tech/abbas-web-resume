import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

test.describe("AvailabilityBanner (/)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the status message with no countdown", async ({
    availabilityBanner,
  }) => {
    await expect(availabilityBanner.root).toBeVisible();
    await expect(
      availabilityBanner.root.getByText("Open to new roles")
    ).toBeVisible();
  });
});
