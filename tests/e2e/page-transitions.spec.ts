import { expect, test } from "@playwright/test";

const ABOUT_REGEX = /\/about$/;
const EXPERIENCE_REGEX = /\/experience$/;

test.describe("Page Transitions and Scroll Behavior", () => {
  test("smooth scrolls to top then navigates sequentially", async ({
    page,
  }) => {
    await page.goto("/about");

    const scrollContainer = page.locator("#main-scroll-container");
    await expect(scrollContainer).toBeVisible();

    await scrollContainer.evaluate((node) => {
      node.scrollTo(0, 500);
    });

    const scrollTopBefore = await scrollContainer.evaluate(
      (node) => node.scrollTop
    );
    expect(scrollTopBefore).toBeGreaterThan(0);

    const experienceLink = page.locator('a[href="/experience"]').first();
    await experienceLink.click();

    await expect(page).toHaveURL(ABOUT_REGEX);

    await expect(scrollContainer).toHaveJSProperty("scrollTop", 0);

    await expect(page).toHaveURL(EXPERIENCE_REGEX);
  });
});
