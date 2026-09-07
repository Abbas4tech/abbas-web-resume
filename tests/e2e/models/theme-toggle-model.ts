import type { Locator, Page } from "@playwright/test";

export class ThemeToggleModel {
  readonly page: Page;
  readonly root: Locator;
  readonly toggleButton: Locator;
  readonly menu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator("header .navbar-end .dropdown");
    this.toggleButton = this.root.getByRole("button");
    this.menu = this.root.getByRole("menu");
  }

  menuItem(theme: string): Locator {
    return this.menu.getByRole("menuitem", { name: theme, exact: false });
  }

  async selectTheme(theme: string) {
    await this.toggleButton.click();
    await this.menuItem(theme).click();
    // DaisyUI's dropdown opens/closes via CSS `:focus-within`; the toggle
    // button keeps focus after clicking a (non-focusable) menu item, so the
    // menu stays open and can overlap the toggle for a subsequent call.
    // Shifting focus elsewhere closes it, leaving a clean state behind.
    await this.page
      .locator(".navbar-start")
      .click({ position: { x: 4, y: 4 } });
  }
}
