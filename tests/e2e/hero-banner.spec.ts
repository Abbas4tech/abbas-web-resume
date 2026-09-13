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

  test("avatar overlaps the bottom edge of the banner (half-in/half-out)", async ({
    heroBanner,
  }) => {
    // Both elements must be present before measuring geometry.
    await expect(heroBanner.bannerImage).toBeVisible();
    await expect(heroBanner.avatarImage).toBeVisible();

    const bannerBox = await heroBanner.bannerImage.boundingBox();
    const avatarBox = await heroBanner.avatarImage.boundingBox();

    // Geometry must be resolvable — a null box means the element is not rendered.
    expect(bannerBox).not.toBeNull();
    expect(avatarBox).not.toBeNull();

    if (!(bannerBox && avatarBox)) {
      return;
    }

    const bannerBottom = bannerBox.y + bannerBox.height;
    const avatarTop = avatarBox.y;
    const avatarBottom = avatarBox.y + avatarBox.height;

    // The avatar must start above the banner's bottom edge (it overlaps in).
    expect(avatarTop).toBeLessThan(bannerBottom);

    // The avatar must also extend below the banner's bottom edge (half out).
    expect(avatarBottom).toBeGreaterThan(bannerBottom);

    // Sanity: the avatar has real positive dimensions.
    expect(avatarBox.width).toBeGreaterThan(0);
    expect(avatarBox.height).toBeGreaterThan(0);
  });
});
