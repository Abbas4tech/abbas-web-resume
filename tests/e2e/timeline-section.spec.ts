import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

const ENTRY_TITLES = [
  "Senior Software Engineer, Fixture Robotics",
  "Software Engineer, Fixture Robotics",
  "Junior Developer, Fixture Robotics",
] as const;

test.describe("TimelineSection (/experience)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/experience");
  });

  test("renders every entry in order", async ({ timelineSection }) => {
    await expect(timelineSection.entryTitles).toHaveCount(3);

    // Each StepTitle carries both a screen-reader-only span and a visually
    // duplicated, animated aria-hidden span with the same text — comparing
    // raw textContent would see every title doubled, so read the sr-only
    // span's text specifically instead.
    await expect(timelineSection.entryTitles.locator(".sr-only")).toHaveText(
      ENTRY_TITLES
    );
  });

  test("renders the current role's meta rows, including an open-ended date range", async ({
    timelineSection,
  }) => {
    const body = timelineSection.entryBody(ENTRY_TITLES[0]);

    await expect(body.getByText("January 2023 - Present")).toBeVisible();
    await expect(body.getByText("Metropolis, Remote")).toBeVisible();
    await expect(body.getByText("Full-time")).toBeVisible();
    await expect(body.getByText("TypeScript, React, GraphQL")).toBeVisible();
  });

  test("renders a closed date range for a past role", async ({
    timelineSection,
  }) => {
    const body = timelineSection.entryBody(ENTRY_TITLES[1]);

    await expect(body.getByText("March 2021 - December 2022")).toBeVisible();
  });

  test("renders the current role's rich-text body with a heading, list, bold mark, and link", async ({
    timelineSection,
  }) => {
    const body = timelineSection.entryBody(ENTRY_TITLES[0]);

    await expect(
      body.getByRole("heading", { name: "What I shipped" })
    ).toBeVisible();

    const boldText = body.getByText("TypeScript", { exact: true });
    await expect(boldText).toHaveJSProperty("tagName", "STRONG");

    const caseStudyLink = body.getByRole("link", { name: "full case study" });
    await expect(caseStudyLink).toHaveAttribute(
      "href",
      "https://example.com/fixture-case-study"
    );

    const listItems = body.getByRole("listitem");
    await expect(listItems).toHaveCount(2);
  });
});
