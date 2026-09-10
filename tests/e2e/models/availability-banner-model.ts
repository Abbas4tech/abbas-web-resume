import type { Locator, Page } from "@playwright/test";

export class AvailabilityBannerModel {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page
      .locator(".rounded-box")
      .filter({ has: page.locator(".status") });
  }

  countdown(label: string): Locator {
    return this.root.getByLabel(label);
  }
}
