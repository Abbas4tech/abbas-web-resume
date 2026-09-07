import type { Locator, Page } from "@playwright/test";

export class PanelShowcaseModel {
  readonly page: Page;
  readonly panels: Locator;

  constructor(page: Page) {
    this.page = page;
    this.panels = page.locator(".mockup-window");
  }

  panel(title: string): Locator {
    return this.panels.filter({
      has: this.page.getByRole("heading", { level: 2, name: title }),
    });
  }

  progressBars(title: string): Locator {
    return this.panel(title).getByRole("progressbar");
  }

  /** The row (icon cluster + progress bar) containing an icon with this accessible name. */
  rowByIcon(panelTitle: string, iconName: string): Locator {
    return this.panel(panelTitle)
      .locator(".grid.grid-cols-2")
      .filter({ has: this.page.getByRole("img", { name: iconName }) });
  }
}
