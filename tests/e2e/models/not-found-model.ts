import type { Locator, Page } from "@playwright/test";

export class NotFoundModel {
  readonly page: Page;
  readonly heading: Locator;
  readonly homeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      level: 1,
      name: "404 - Page Not Found",
    });
    this.homeLink = page.getByRole("link", { name: "Go back home" });
  }
}
