import { test as base } from "@playwright/test";
import { AppHeaderModel } from "../models/app-header-model";
import { BottomDockModel } from "../models/bottom-dock-model";
import { CardGridModel } from "../models/card-grid-model";
import { HeroBannerModel } from "../models/hero-banner-model";
import { PanelShowcaseModel } from "../models/panel-showcase-model";
import { SidebarNavModel } from "../models/sidebar-nav-models";
import { SplitContentPanelModel } from "../models/split-content-panel-model";
import { ThemeToggleModel } from "../models/theme-toggle-model";
import { TimelineSectionModel } from "../models/timeline-section-model";

interface CustomFixtures {
  bottomDock: BottomDockModel;
  cardGrid: CardGridModel;
  header: AppHeaderModel;
  heroBanner: HeroBannerModel;
  mockContentful: (mockData: Record<string, unknown>) => Promise<void>;
  panelShowcase: PanelShowcaseModel;
  sidebar: SidebarNavModel;
  splitContentPanel: SplitContentPanelModel;
  themeToggle: ThemeToggleModel;
  timelineSection: TimelineSectionModel;
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
  heroBanner: async ({ page }, use) => {
    await use(new HeroBannerModel(page));
  },
  cardGrid: async ({ page }, use) => {
    await use(new CardGridModel(page));
  },
  timelineSection: async ({ page }, use) => {
    await use(new TimelineSectionModel(page));
  },
  splitContentPanel: async ({ page }, use) => {
    await use(new SplitContentPanelModel(page));
  },
  panelShowcase: async ({ page }, use) => {
    await use(new PanelShowcaseModel(page));
  },
});
