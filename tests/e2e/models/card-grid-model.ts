import type { Locator, Page } from "@playwright/test";

export class CardGridModel {
  readonly page: Page;
  readonly cards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cards = page.locator(".card");
  }

  card(title: string): Locator {
    return this.cards.filter({
      has: this.page.getByRole("heading", { level: 2, name: title }),
    });
  }

  cardLink(title: string): Locator {
    return this.card(title).getByRole("link");
  }
}
