import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

test.describe("MockupGallery (/projects)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("renders every item inside a browser mockup frame", async ({
    mockupGallery,
  }) => {
    await expect(mockupGallery.frames).toHaveCount(2);
    await expect(mockupGallery.item("Fixture Dashboard")).toBeVisible();
    await expect(mockupGallery.item("Mock Market")).toBeVisible();
  });
});
