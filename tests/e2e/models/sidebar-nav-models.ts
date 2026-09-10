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

  navLink(name: string): Locator {
    return this.root.getByRole("link", { name, exact: false });
  }

  async clickNavItem(name: string) {
    await this.navLink(name).click();
  }

  async isActive(name: string) {
    const classes = await this.navLink(name).getAttribute("class");
    return (classes ?? "").includes("font-bold");
  }

  async getNavItemsCount() {
    return await this.menuItems.count();
  }
}
