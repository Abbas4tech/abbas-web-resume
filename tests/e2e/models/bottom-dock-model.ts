import type { Locator, Page } from "@playwright/test";

export class BottomDockModel {
  readonly page: Page;
  readonly root: Locator;
  readonly items: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator(".dock").first();
    this.items = this.root.getByRole("link");
  }

  item(label: string): Locator {
    return this.root.getByRole("link", { name: label, exact: false });
  }
}
