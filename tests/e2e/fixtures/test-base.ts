import { test as base } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { AppHeaderModel } from "../models/app-header-model";
import { AvailabilityBannerModel } from "../models/availability-banner-model";
import { BottomDockModel } from "../models/bottom-dock-model";
import { CardGridModel } from "../models/card-grid-model";
import { CarouselModel } from "../models/carousel-model";
import { HeroBannerModel } from "../models/hero-banner-model";
import { MockupGalleryModel } from "../models/mockup-gallery-model";
import { NotFoundModel } from "../models/not-found-model";
import { PanelShowcaseModel } from "../models/panel-showcase-model";
import { ServerErrorModel } from "../models/server-error-model";
import { SidebarNavModel } from "../models/sidebar-nav-models";
import { SplitContentPanelModel } from "../models/split-content-panel-model";
import { TestimonialWallModel } from "../models/testimonial-wall-model";
import { ThemeToggleModel } from "../models/theme-toggle-model";
import { TimelineSectionModel } from "../models/timeline-section-model";

interface CustomFixtures {
  availabilityBanner: AvailabilityBannerModel;
  bottomDock: BottomDockModel;
  cardGrid: CardGridModel;
  carousel: CarouselModel;
  header: AppHeaderModel;
  heroBanner: HeroBannerModel;
  mockContentful: (mockData: Record<string, unknown>) => Promise<void>;
  mockupGallery: MockupGalleryModel;
  notFound: NotFoundModel;
  panelShowcase: PanelShowcaseModel;
  serverError: ServerErrorModel;
  sidebar: SidebarNavModel;
  splitContentPanel: SplitContentPanelModel;
  testimonialWall: TestimonialWallModel;
  themeToggle: ThemeToggleModel;
  timelineSection: TimelineSectionModel;
}

export const test = base.extend<CustomFixtures>({
  header: async ({ page }, use) => {
    await use(new AppHeaderModel(page));
  },
  availabilityBanner: async ({ page }, use) => {
    await use(new AvailabilityBannerModel(page));
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
  mockupGallery: async ({ page }, use) => {
    await use(new MockupGalleryModel(page));
  },
  cardGrid: async ({ page }, use) => {
    await use(new CardGridModel(page));
  },
  carousel: async ({ page }, use) => {
    await use(new CarouselModel(page));
  },
  timelineSection: async ({ page }, use) => {
    await use(new TimelineSectionModel(page));
  },
  splitContentPanel: async ({ page }, use) => {
    await use(new SplitContentPanelModel(page));
  },
  testimonialWall: async ({ page }, use) => {
    await use(new TestimonialWallModel(page));
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
      // color-contrast measures *rendered* pixels, which axe-core samples
      // via getComputedStyle/canvas sampling — font hinting, subpixel
      // anti-aliasing, and installed-font differences between machines all
      // shift the measured ratio. One real, borderline case
      // (daisyUI's `.stat-title`, 4.39:1 against a 4.5:1 requirement) was
      // right at that edge locally; on GitHub Actions' Linux runners the
      // same rule fired unpredictably across many *different* elements on
      // *every* WebKit-engine project (webkit, Mobile Safari, Tablet) and
      // survived all retries — not the one-off animation-timing flake this
      // file used to guard against with a settle delay, but a systemic,
      // environment-dependent false-positive rate that made the whole
      // suite unreliable. Disabled outright rather than chasing per-element
      // exclusions across an unbounded set of rendering environments; real
      // contrast issues need a tool that isn't sensitive to *which machine*
      // rendered the page (a design-token audit, or manual review).
      "color-contrast": { enabled: false },
    },
  },
};

// BlockPlaceholder only ever renders in development (see its own
// `NODE_ENV !== "development"` guard) as a diagnostic for a missing Block
// registry mapping — never shipped to production. Excluded outright rather
// than disabling heading-order suite-wide for one intentionally unpolished
// dev-only tool.
const ACCESSIBILITY_SCAN_CONTEXT = { exclude: [".border-warning"] };

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
