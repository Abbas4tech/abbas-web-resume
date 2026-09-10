import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

test.describe("PanelShowcase (/skills)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/skills");
  });

  test("renders every panel", async ({ panelShowcase }) => {
    await expect(panelShowcase.panels).toHaveCount(3);
    for (const title of ["Frontend", "Backend", "Tooling & Testing"]) {
      await expect(panelShowcase.panel(title)).toBeVisible();
    }
  });

  test("Frontend panel shows each skill's progress value", async ({
    panelShowcase,
  }) => {
    await expect(panelShowcase.progressBars("Frontend")).toHaveCount(3);

    await expect(
      panelShowcase.rowByIcon("Frontend", "React").getByRole("progressbar")
    ).toHaveAttribute("aria-valuenow", "90");
    await expect(
      panelShowcase.rowByIcon("Frontend", "TypeScript").getByRole("progressbar")
    ).toHaveAttribute("aria-valuenow", "85");
    await expect(
      panelShowcase
        .rowByIcon("Frontend", "Tailwind CSS")
        .getByRole("progressbar")
    ).toHaveAttribute("aria-valuenow", "80");
  });

  test("each progress bar has an accessible name naming its skill", async ({
    panelShowcase,
  }) => {
    await expect(
      panelShowcase.progressBar("Frontend", "React & Next.js")
    ).toHaveAttribute("aria-valuenow", "90");
    await expect(
      panelShowcase.progressBar("Frontend", "TypeScript")
    ).toHaveAttribute("aria-valuenow", "85");
    await expect(
      panelShowcase.progressBar("Frontend", "Styling")
    ).toHaveAttribute("aria-valuenow", "80");
  });

  test("Backend and Tooling panels show their own skill icons", async ({
    panelShowcase,
  }) => {
    await expect(panelShowcase.rowByIcon("Backend", "Node.js")).toBeVisible();
    await expect(
      panelShowcase.rowByIcon("Backend", "PostgreSQL")
    ).toBeVisible();
    await expect(
      panelShowcase.rowByIcon("Tooling & Testing", "Vitest")
    ).toBeVisible();
    await expect(
      panelShowcase.rowByIcon("Tooling & Testing", "Storybook")
    ).toBeVisible();
  });
});
