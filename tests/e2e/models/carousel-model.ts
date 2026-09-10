import type { Locator, Page } from "@playwright/test";

export class CarouselModel {
  readonly page: Page;
  readonly root: Locator;
  readonly slides: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator(".carousel").first();
    this.slides = this.root.locator(".carousel-item");
  }

  slide(title: string): Locator {
    return this.slides.filter({
      has: this.page.getByRole("heading", { level: 3, name: title }),
    });
  }

  slideLink(title: string, name: string): Locator {
    return this.slide(title).getByRole("link", { name });
  }
}
