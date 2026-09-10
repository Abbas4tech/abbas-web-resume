import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

const PROJECTS = [
  {
    title: "Fixture Dashboard",
    description:
      "An analytics dashboard built to stress-test the CardGrid block.",
    demoUrl: "https://example.com/fixture-dashboard",
  },
  {
    title: "Mock Market",
    description:
      "A synthetic storefront used to exercise checkout journeys in demos.",
    demoUrl: "https://example.com/mock-market",
  },
  {
    title: "Fixture CLI",
    description:
      "A command-line tool that scaffolds fake content for local testing.",
    demoUrl: "https://example.com/fixture-cli",
  },
  {
    title: "Fake Forecast",
    description:
      "A weather widget backed entirely by deterministic sample data.",
    demoUrl: "https://example.com/fake-forecast",
  },
] as const;

test.describe("CardGrid (/projects)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects");
  });

  test("renders every project card", async ({ cardGrid }) => {
    await expect(cardGrid.cards).toHaveCount(4);
  });

  for (const project of PROJECTS) {
    test(`"${project.title}" card shows its description and links out to the demo`, async ({
      cardGrid,
    }) => {
      const card = cardGrid.card(project.title);

      await expect(card).toBeVisible();
      await expect(card.getByText(project.description)).toBeVisible();

      const link = cardGrid.cardLink(project.title);
      await expect(link).toHaveAttribute("href", project.demoUrl);
      await expect(link).toHaveAttribute("target", "_blank");
    });
  }
});
