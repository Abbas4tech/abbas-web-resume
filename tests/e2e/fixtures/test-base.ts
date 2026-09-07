import { test as base } from "@playwright/test";
import { AppHeaderModel } from "../models/app-header-model";
import { BottomDockModel } from "../models/bottom-dock-model";
import { SidebarNavModel } from "../models/sidebar-nav-models";
import { ThemeToggleModel } from "../models/theme-toggle-model";

interface CustomFixtures {
  bottomDock: BottomDockModel;
  header: AppHeaderModel;
  mockContentful: (mockData: Record<string, unknown>) => Promise<void>;
  sidebar: SidebarNavModel;
  themeToggle: ThemeToggleModel;
}

export const test = base.extend<CustomFixtures>({
  header: async ({ page }, use) => {
    await use(new AppHeaderModel(page));
  },
  sidebar: async ({ page }, use) => {
    await use(new SidebarNavModel(page));
  },
  themeToggle: async ({ page }, use) => {
    await use(new ThemeToggleModel(page));
  },
  bottomDock: async ({ page }, use) => {
    await use(new BottomDockModel(page));
  },
});
