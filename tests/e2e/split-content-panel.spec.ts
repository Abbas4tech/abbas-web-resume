import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

test.describe("SplitContentPanel (/about)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("renders the description rich text", async ({ page }) => {
    await expect(
      page.getByText(
        "A little about this fictional engineer — entirely fixture data, used only for testing."
      )
    ).toBeVisible();
  });

  test("renders every info row with its label and value", async ({
    splitContentPanel,
  }) => {
    await expect(
      splitContentPanel.infoRow("Location").getByText("Remote, Wonderland")
    ).toBeVisible();
    await expect(
      splitContentPanel
        .infoRow("Focus")
        .getByText("Accessible, composable design systems")
    ).toBeVisible();
    await expect(
      splitContentPanel
        .infoRow("Currently")
        .getByText("Building a synthetic fixture site for E2E coverage")
    ).toBeVisible();
  });
});
