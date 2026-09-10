import type { Locator, Page } from "@playwright/test";

export class FooterModel {
  readonly page: Page;
  readonly root: Locator;
  readonly links: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("footer").first();
    this.links = this.root.getByRole("navigation").getByRole("link");
  }

  link(label: string): Locator {
    return this.root
      .getByRole("navigation")
      .getByRole("link", { name: label, exact: false });
  }

  emailLink(email: string): Locator {
    return this.root.getByRole("link", { name: email });
  }
}
