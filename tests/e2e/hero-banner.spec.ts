import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

test.describe("HeroBanner (/about)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("renders the banner and avatar images", async ({ heroBanner }) => {
    await expect(heroBanner.bannerImage).toBeVisible();
    await expect(heroBanner.avatarImage).toBeVisible();
  });

  test("renders every social icon link with the right destination", async ({
    heroBanner,
  }) => {
    await expect(heroBanner.iconLink("GitHub")).toHaveAttribute(
      "href",
      "https://github.com/fixture-user"
    );
    await expect(heroBanner.iconLink("LinkedIn")).toHaveAttribute(
      "href",
      "https://linkedin.com/in/fixture-user"
    );
    await expect(heroBanner.iconLink("Email")).toHaveAttribute(
      "href",
      "mailto:ada@fixture.dev"
    );

    for (const label of ["GitHub", "LinkedIn", "Email"]) {
      await expect(heroBanner.iconLink(label)).toHaveAttribute(
        "target",
        "_blank"
      );
    }
  });
});
