import { expect, test } from "@playwright/test";

test("homepage loads successfully", async ({ page }) => {
  await page.goto("/");

  // Wait for the main content to be visible. This confirms the app rendered.
  await expect(page.locator("main").first()).toBeVisible();
});
