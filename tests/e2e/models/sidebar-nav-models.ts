import type { Locator, Page } from "@playwright/test";

export class SidebarNavModel {
  readonly page: Page;
  readonly root: Locator;
  readonly menuItems: Locator;

  constructor(page: Page) {
    this.page = page;
    // Scoped to the drawer side menu
    this.root = page.locator(".drawer-side ul");
    this.menuItems = this.root.locator("li");
  }

  async clickNavItem(name: string) {
    await this.menuItems.filter({ hasText: name }).click();
  }

  async getNavItemsCount() {
    return await this.menuItems.count();
  }
}
