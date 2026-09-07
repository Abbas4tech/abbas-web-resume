import type { Locator, Page } from "@playwright/test";

export class SplitContentPanelModel {
  readonly page: Page;
  readonly infoRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.infoRows = page.locator(".stats");
  }

  infoRow(label: string): Locator {
    return this.infoRows.filter({ has: this.page.getByText(label) });
  }
}
