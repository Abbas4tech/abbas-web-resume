import type { Locator, Page } from "@playwright/test";

export class TestimonialWallModel {
  readonly page: Page;
  readonly testimonials: Locator;

  constructor(page: Page) {
    this.page = page;
    this.testimonials = page.locator(".chat");
  }

  testimonial(author: string): Locator {
    return this.testimonials.filter({ hasText: author });
  }
}
