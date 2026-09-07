import type { Locator, Page } from "@playwright/test";

export class ServerErrorModel {
  readonly page: Page;
  readonly heading: Locator;
  readonly retryButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      level: 1,
      name: "500 - Server Error",
    });
    this.retryButton = page.getByRole("button", { name: "Try again" });
  }
}
