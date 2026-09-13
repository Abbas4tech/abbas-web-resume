import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

const MOBILE_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;
const ABOUT_PATH_PATTERN = /\/about$/;

test.describe("E2E Smoke Test", () => {
  test("Loads the app with the mocked fixture layout", async ({
    page,
    header,
  }) => {
    await page.goto("/");

    // `src/middleware.ts` redirects "/" to "/about" unconditionally.
    await expect(page).toHaveURL(ABOUT_PATH_PATTERN);
    await expect(page.locator("main").first()).toBeVisible();

    await expect(header.root).toBeVisible();
    expect(await header.getTitle()).toBe("Ada Sparkline");

    // The page heading and hero avatar prove the mocked GraphQL fixture (not
    // just an empty shell) actually reached the render tree.
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
    await expect(
      page.getByRole("img", { name: "Ada Sparkline avatar illustration" })
    ).toBeVisible();
  });

  test("navigation surfaces the full fixture nav depending on viewport", async ({
    page,
    header,
    sidebar,
  }) => {
    await page.goto("/");

    const viewportWidth = page.viewportSize()?.width ?? 1280;

    if (viewportWidth < MOBILE_BREAKPOINT) {
      // Layout is fixed to the "dock-on-mobile" drawer variant, so the
      // sidebar is replaced by the BottomDock below this breakpoint.
      await expect(page.locator(".dock").first()).toBeVisible();
    } else {
      // Between the mobile and lg breakpoints, the drawer is an off-canvas
      // overlay that starts closed (see the comment on DrawerProvider's
      // `open` state in drawer.tsx) — open it first. At lg and up,
      // `lg:drawer-open` keeps the sidebar visible regardless, so this is a
      // harmless no-op there.
      if (viewportWidth < LG_BREAKPOINT) {
        await header.toggleDrawer();
      }
      await expect(sidebar.menuItems.first()).toBeVisible();
      expect(await sidebar.getNavItemsCount()).toBe(6);
    }
  });

  test("layout has exactly one scroll container inside drawer-content", async ({
    page,
  }) => {
    await page.goto("/about");

    // Count overflow-y-auto nodes directly inside .drawer-content.
    // The scroll container now uses overflow-y-auto + overflow-x-hidden
    // (split from overflow-auto) to prevent horizontal scroll bleed while
    // keeping vertical scroll working. More than one means a nested scroll
    // container is present — the bug that broke tooltip positioning.
    const scrollContainerCount = await page
      .locator(".drawer-content .overflow-y-auto")
      .count();
    expect(scrollContainerCount).toBe(1);

    // The scroll container must also clamp horizontal overflow — any content
    // wider than the container (e.g. parallax motion divs) must not create
    // a horizontal scrollbar.
    const scrollContainerClasses = await page
      .locator(".drawer-content .overflow-y-auto")
      .first()
      .getAttribute("class");
    expect(scrollContainerClasses).toContain("overflow-x-hidden");

    // The <main> element (PageWrapper) must NOT be a scroll container — its
    // parent wrapper div in contentful-layout.tsx owns scrolling exclusively.
    const mainClasses = await page
      .locator("main")
      .first()
      .getAttribute("class");
    expect(mainClasses).not.toContain("overflow-auto");
  });
});
