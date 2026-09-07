import type { Locator, Page } from "@playwright/test";

export class AppHeaderModel {
  readonly page: Page;
  readonly root: Locator;
  readonly titleLink: Locator;
  readonly drawerButton: Locator;
  readonly resumeLink: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    // Scoped to the header block
    this.root = page.locator("header").first();
    this.titleLink = this.root.locator(".navbar-start a.btn-ghost");
    this.drawerButton = this.root.locator("label.drawer-button");
    this.resumeLink = this.root.locator('.navbar-end a[target="_blank"]');
    this.themeToggle = this.root.locator(".navbar-end .dropdown");
  }

  async toggleDrawer() {
    await this.drawerButton.click();
  }

  async getTitle() {
    return await this.titleLink.textContent();
  }
}
