import { test as base } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { AppHeaderModel } from "../models/app-header-model";
import { BottomDockModel } from "../models/bottom-dock-model";
import { CardGridModel } from "../models/card-grid-model";
import { HeroBannerModel } from "../models/hero-banner-model";
import { NotFoundModel } from "../models/not-found-model";
import { PanelShowcaseModel } from "../models/panel-showcase-model";
import { ServerErrorModel } from "../models/server-error-model";
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
  notFound: NotFoundModel;
  panelShowcase: PanelShowcaseModel;
  serverError: ServerErrorModel;
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
  notFound: async ({ page }, use) => {
    await use(new NotFoundModel(page));
  },
  serverError: async ({ page }, use) => {
    await use(new ServerErrorModel(page));
  },
});

// Rules disabled suite-wide because the app genuinely doesn't satisfy them
// yet — each is a real, documented gap (see ADR 0022 §4), not a false
// positive. Disabling them here means a *new* violation of anything else
// still fails the test it's found in, rather than requiring a parallel,
// easy-to-forget a11y-only suite.
const ACCESSIBILITY_SCAN_OPTIONS = {
  axeOptions: {
    rules: {
      // SectionHeading has no h1 variant — every page's own heading renders
      // as an h2.
      "page-has-heading-one": { enabled: false },
      // The sidebar and BottomDock aren't wrapped in a nav/landmark element.
      region: { enabled: false },
      // DaisyUI's `.stats` row can overflow horizontally without being
      // keyboard-focusable when it does.
      "scrollable-region-focusable": { enabled: false },
    },
  },
};

const ACCESSIBILITY_SCAN_CONTEXT = {
  exclude: [
    // BlockPlaceholder only ever renders in development (see its own
    // `NODE_ENV !== "development"` guard) as a diagnostic for a missing
    // Block registry mapping — never shipped to production. Excluded
    // outright rather than disabling color-contrast/heading-order
    // suite-wide for one intentionally unpolished dev-only tool.
    ".border-warning",
    // DaisyUI's default `.stat-title` color measures 4.39:1 against
    // `bg-base-300` in the light theme — short of WCAG AA's 4.5:1 by a
    // hair, and specific to the light theme's exact token values (not
    // reproduced by anything this suite added). A real, marginal design-
    // system gap; excluded rather than guessing at a safe-looking override
    // across three themes with no visual review in this pass.
    ".stat-title",
  ],
};

// Framer Motion's spring-based animations (used throughout — theme-switch
// icon transitions, stagger/fade-up entrances) aren't driven by the native
// Web Animations API, so there's no reliable "wait for animations" signal to
// hook into. A scan that fires the instant a test's own assertions pass can
// catch a genuinely mid-transition frame (observed: a transient
// color-contrast "violation" after switching themes that a rerun on the
// same page couldn't reproduce). This settle delay is a pragmatic trade
// against that flakiness, not a claim about how long any specific animation
// takes.
const ANIMATION_SETTLE_MS = 750;

test.afterEach(async ({ page }) => {
  if (page.url() === "about:blank") {
    return;
  }
  await page.waitForTimeout(ANIMATION_SETTLE_MS);
  await injectAxe(page);
  await checkA11y(page, ACCESSIBILITY_SCAN_CONTEXT, ACCESSIBILITY_SCAN_OPTIONS);
});
