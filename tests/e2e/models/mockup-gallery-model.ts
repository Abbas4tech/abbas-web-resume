import type { Locator, Page } from "@playwright/test";

export class MockupGalleryModel {
  readonly page: Page;
  readonly frames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frames = page.locator(".mockup-browser, .mockup-phone");
  }

  item(title: string): Locator {
    return this.frames.locator("..").filter({
      has: this.page.getByRole("heading", { level: 3, name: title }),
    });
  }
}
