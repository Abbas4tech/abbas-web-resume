import { test as base } from "@playwright/test";
import { AppHeaderModel } from "../models/app-header-model";
import { SidebarNavModel } from "../models/sidebar-nav-models";

interface CustomFixtures {
  header: AppHeaderModel;
  mockContentful: (mockData: Record<string, unknown>) => Promise<void>;
  sidebar: SidebarNavModel;
}

export const test = base.extend<CustomFixtures>({
  header: async ({ page }, use) => {
    await use(new AppHeaderModel(page));
  },
  sidebar: async ({ page }, use) => {
    await use(new SidebarNavModel(page));
  },
});
