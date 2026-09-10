import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

const SLIDES = [
  {
    title: "Fixture Dashboard",
    description:
      "Featured build: an analytics dashboard used to stress-test the CardGrid block.",
  },
  {
    title: "Fixture CLI",
    description:
      "Featured build: a command-line tool that scaffolds fake content for local testing.",
  },
] as const;

test.describe("Carousel (/projects)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("renders every highlight slide", async ({ carousel }) => {
    await expect(carousel.slides).toHaveCount(2);
  });

  for (const slide of SLIDES) {
    test(`"${slide.title}" slide shows its title and description`, async ({
      carousel,
    }) => {
      const slideLocator = carousel.slide(slide.title);

      await expect(slideLocator).toBeVisible();
      await expect(slideLocator.getByText(slide.description)).toBeVisible();
    });
  }
});
