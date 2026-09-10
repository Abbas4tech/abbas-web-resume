import type { Locator, Page } from "@playwright/test";

const BANNER_NAME_PATTERN = /banner/i;
const AVATAR_NAME_PATTERN = /avatar/i;

export class HeroBannerModel {
  readonly page: Page;
  readonly bannerImage: Locator;
  readonly avatarImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bannerImage = page.getByRole("img", { name: BANNER_NAME_PATTERN });
    this.avatarImage = page.getByRole("img", { name: AVATAR_NAME_PATTERN });
  }

  iconLink(label: string): Locator {
    return this.page.getByRole("link", { name: `Visit ${label}` });
  }
}
