import { expect, test } from "@playwright/test";

const ABOUT_PATH_PATTERN = /\/about$/;

test("homepage loads successfully with the fixture site's content", async ({
  page,
}) => {
  await page.goto("/");

  // `src/middleware.ts` redirects "/" to "/about" unconditionally.
  await expect(page).toHaveURL(ABOUT_PATH_PATTERN);

  // Wait for the main content to be visible. This confirms the app rendered.
  await expect(page.locator("main").first()).toBeVisible();

  // The page heading and hero avatar prove the mocked GraphQL fixture (not
  // just an empty shell) actually reached the render tree.
  await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Ada Sparkline avatar illustration" })
  ).toBeVisible();
});
