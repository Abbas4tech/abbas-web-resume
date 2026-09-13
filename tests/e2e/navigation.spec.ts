import { expect } from "@playwright/test";
import { test } from "./fixtures/test-base";

const MOBILE_BREAKPOINT = 768;
const LG_BREAKPOINT = 1024;
const EXPERIENCE_PATH_PATTERN = /\/experience$/;

const NAV_PAGES = [
  { label: "About", path: "/about" },
  { label: "Experience", path: "/experience" },
  { label: "Projects", path: "/projects" },
  { label: "Skills", path: "/skills" },
  { label: "Experiments", path: "/experiments" },
] as const;

test.describe("Global chrome — header", () => {
  test("resume link opens the résumé in a new tab", async ({
    page,
    header,
  }) => {
    await page.goto("/about");

    await expect(header.resumeLink).toHaveAttribute(
      "href",
      "/ada-sparkline-resume.pdf"
    );
    await expect(header.resumeLink).toHaveAttribute("target", "_blank");
  });

  test("theme toggle switches the active theme", async ({
    page,
    themeToggle,
  }) => {
    await page.goto("/about");

    // The layout's `defaultTheme` is only applied to the DOM once a theme is
    // actively selected — `<html>` carries no `data-theme` attribute at all
    // until then, so the first assertion is on the *selected* theme.
    const html = page.locator("html");

    await themeToggle.selectTheme("dark");
    await expect(html).toHaveAttribute("data-theme", "dark");

    await themeToggle.selectTheme("synthwave");
    await expect(html).toHaveAttribute("data-theme", "synthwave");
  });
});

test.describe("Global chrome — sidebar navigation", () => {
  test.beforeEach(async ({ page, header }) => {
    const viewportWidth = page.viewportSize()?.width ?? 1280;
    // biome-ignore lint/suspicious/noSkippedTests: viewport-conditional — the sidebar is replaced by the BottomDock below the mobile breakpoint, not a disabled/pending test.
    test.skip(
      viewportWidth < MOBILE_BREAKPOINT,
      "Sidebar is replaced by the BottomDock below the mobile breakpoint."
    );

    await page.goto("/about");

    // Between the mobile and lg breakpoints, the drawer is an off-canvas
    // overlay that starts closed (see the comment on DrawerProvider's
    // `open` state in drawer.tsx) — open it first. At lg and up,
    // `lg:drawer-open` keeps the sidebar visible regardless, so this is a
    // harmless no-op there.
    if (viewportWidth < LG_BREAKPOINT) {
      await header.toggleDrawer();
    }
  });

  for (const { label, path } of NAV_PAGES) {
    const pathPattern = new RegExp(`${path}$`);

    test(`"${label}" nav item navigates to ${path} and highlights as active`, async ({
      page,
      header,
      sidebar,
    }) => {
      const viewportWidth = page.viewportSize()?.width ?? 1280;

      await sidebar.clickNavItem(label);
      await expect(page).toHaveURL(pathPattern);

      // Clicking a nav link also closes the drawer (NavItem's onClick, see
      // ADR 0022 PR 9) — below `lg`, that's an off-canvas overlay actually
      // closing, not just a state flag, so the just-clicked link can become
      // unreachable to a follow-up query. Reopen before checking the
      // highlight; at `lg` and up this is a no-op (CSS keeps it open
      // regardless).
      if (viewportWidth < LG_BREAKPOINT) {
        await header.toggleDrawer();
      }
      expect(await sidebar.isActive(label)).toBe(true);
    });
  }
});

test.describe("Global chrome — drawer toggle (tablet)", () => {
  test.beforeEach(({ page }) => {
    const viewportWidth = page.viewportSize()?.width ?? 1280;
    // The toggleable off-canvas drawer only exists in the 768-1023px gap:
    // below 768px the fixture's dock-on-mobile variant hides DrawerButton
    // entirely (the BottomDock takes over); at 1024px and up, DrawerButton
    // is `lg:hidden`. See ADR 0022 PR 5, which found this gap and deferred
    // it pending exactly this device project.
    // biome-ignore lint/suspicious/noSkippedTests: viewport-conditional — see comment above, not a disabled/pending test.
    test.skip(
      viewportWidth < MOBILE_BREAKPOINT || viewportWidth >= LG_BREAKPOINT,
      "The toggleable drawer only exists between the mobile and lg breakpoints."
    );
  });

  test("opens and closes the sidebar drawer via the header toggle button", async ({
    page,
    header,
  }) => {
    await page.goto("/about");

    // Starts collapsed — see the comment on DrawerProvider's `open` state
    // (drawer.tsx) for why. Confirming that here is itself a regression
    // guard: this same "opens by default at tablet width" bug is exactly
    // what routing.spec.ts's NotFound test tripped over (the drawer's own
    // overlay blocking the "Go back home" link) before the fix.
    const drawer = page.locator(".drawer");
    await expect(drawer).toHaveAttribute("data-state", "collapsed");

    // The toggle button must have a real, visible bounding box — a zero-size
    // or null box means the icon failed to load or the element is sr-only.
    const drawerButtonBox = await header.drawerButton.boundingBox();
    expect(drawerButtonBox).not.toBeNull();
    if (drawerButtonBox) {
      expect(drawerButtonBox.width).toBeGreaterThan(0);
      expect(drawerButtonBox.height).toBeGreaterThan(0);
    }

    await header.toggleDrawer();
    await expect(drawer).toHaveAttribute("data-state", "expanded");

    await header.toggleDrawer();
    await expect(drawer).toHaveAttribute("data-state", "collapsed");
  });
});

test.describe("Global chrome — bottom dock (mobile)", () => {
  test.beforeEach(({ page }) => {
    const viewportWidth = page.viewportSize()?.width ?? 1280;
    // biome-ignore lint/suspicious/noSkippedTests: viewport-conditional — the BottomDock only renders under the mobile breakpoint for the dock-on-mobile drawer variant, not a disabled/pending test.
    test.skip(
      viewportWidth >= MOBILE_BREAKPOINT,
      "BottomDock only renders under the mobile breakpoint for the dock-on-mobile drawer variant."
    );
  });

  test("surfaces every nav item and navigates on tap", async ({
    page,
    bottomDock,
  }) => {
    await page.goto("/about");

    await expect(bottomDock.root).toBeVisible();
    expect(await bottomDock.items.count()).toBe(6);

    await bottomDock.item("Experience").click();
    await expect(page).toHaveURL(EXPERIENCE_PATH_PATTERN);
  });
});
