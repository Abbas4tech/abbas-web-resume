import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load the home page successfully", async ({ page }) => {
    await page.goto("/");

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Check if the page title is present
    await expect(page).toHaveTitle(/Abbas/);
  });

  test("should have profile banner visible", async ({ page }) => {
    await page.goto("/");

    // Wait for the banner to be visible
    await expect(page.locator("text=/Abbas|Profile/i").first()).toBeVisible();
  });

  test("should have navigation elements", async ({ page }) => {
    await page.goto("/");

    // Check for navigation or dock elements
    await expect(page.locator('nav, [role="navigation"]').first()).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("should navigate to About page", async ({ page }) => {
    await page.goto("/");

    // Click on About link/button
    const aboutLink = page.locator('a[href*="about"], button:has-text("About")').first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await page.waitForURL("**/about**");
      await expect(page).toHaveURL(/about/);
    }
  });

  test("should navigate to Experience page", async ({ page }) => {
    await page.goto("/");

    // Click on Experience link/button
    const expLink = page.locator('a[href*="experience"], button:has-text("Experience")').first();
    if (await expLink.isVisible()) {
      await expLink.click();
      await page.waitForURL("**/experience**");
      await expect(page).toHaveURL(/experience/);
    }
  });

  test("should navigate to Projects page", async ({ page }) => {
    await page.goto("/");

    // Click on Projects link/button
    const projectsLink = page.locator('a[href*="projects"], button:has-text("Projects")').first();
    if (await projectsLink.isVisible()) {
      await projectsLink.click();
      await page.waitForURL("**/projects**");
      await expect(page).toHaveURL(/projects/);
    }
  });

  test("should navigate to Skills page", async ({ page }) => {
    await page.goto("/");

    // Click on Skills link/button
    const skillsLink = page.locator('a[href*="skills"], button:has-text("Skills")').first();
    if (await skillsLink.isVisible()) {
      await skillsLink.click();
      await page.waitForURL("**/skills**");
      await expect(page).toHaveURL(/skills/);
    }
  });
});

test.describe("Responsive Design", () => {
  test("should be mobile responsive", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await page.waitForLoadState("networkidle");

    // Check if page loads on mobile
    await expect(page).toHaveTitle(/Abbas/);
  });

  test("should be tablet responsive", async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    await page.waitForLoadState("networkidle");

    // Check if page loads on tablet
    await expect(page).toHaveTitle(/Abbas/);
  });
});

test.describe("Theme Switching", () => {
  test("should toggle theme if available", async ({ page }) => {
    await page.goto("/");

    // Look for theme switch button
    const themeSwitch = page
      .locator('button[aria-label*="theme"], button:has-text("theme")')
      .first();

    if (await themeSwitch.isVisible()) {
      // Get initial theme
      const initialTheme = await page.evaluate(
        () =>
          document.documentElement.getAttribute("data-theme") || document.documentElement.className
      );

      // Click theme switch
      await themeSwitch.click();

      // Wait for theme change
      await page.waitForTimeout(300);

      // Verify theme changed
      const newTheme = await page.evaluate(
        () =>
          document.documentElement.getAttribute("data-theme") || document.documentElement.className
      );
      expect(newTheme).not.toBe(initialTheme);
    }
  });
});
