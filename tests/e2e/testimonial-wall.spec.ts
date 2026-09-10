import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

test.describe("TestimonialWall (/about)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("renders every testimonial", async ({ testimonialWall }) => {
    await expect(testimonialWall.testimonials).toHaveCount(2);
  });

  test("shows each testimonial's author, meta, and quote", async ({
    testimonialWall,
  }) => {
    const priya = testimonialWall.testimonial("Priya Fixture");
    await expect(priya).toBeVisible();
    await expect(
      priya.getByText("Engineering Manager, Mock Market")
    ).toBeVisible();
    await expect(
      priya.getByText(
        "Shipped ahead of schedule and the design system paid for itself within a quarter."
      )
    ).toBeVisible();

    const sam = testimonialWall.testimonial("Sam Fixture");
    await expect(sam).toBeVisible();
    await expect(
      sam.getByText(
        "The clearest technical writing and the most reliable delivery on the team."
      )
    ).toBeVisible();
  });
});
