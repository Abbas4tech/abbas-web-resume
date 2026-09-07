import type { Locator, Page } from "@playwright/test";

export class TimelineSectionModel {
  readonly page: Page;
  readonly entryTitles: Locator;

  constructor(page: Page) {
    this.page = page;
    // Scoped to StepTitle specifically (identified by its sr-only span) —
    // a rich-text body can itself contain an <h3>, which would otherwise be
    // indistinguishable from a genuine timeline entry title.
    this.entryTitles = page
      .locator("h3")
      .filter({ has: page.locator(".sr-only") });
  }

  entry(title: string): Locator {
    return this.page.getByRole("heading", { level: 3, name: title });
  }

  /** The StepBody wrapping one entry's title, meta rows, and rich-text body. */
  entryBody(title: string): Locator {
    return this.entry(title).locator("..");
  }
}
