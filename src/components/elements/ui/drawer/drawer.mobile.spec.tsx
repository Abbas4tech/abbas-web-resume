import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Drawer, DrawerButton, DrawerProvider, DrawerSide } from "./drawer";

// Isolated in its own file because this mock affects every test in the
// module: the rest of the Drawer suite (drawer.spec.tsx) relies on the
// default (desktop) behavior of useMobile. vi.mock calls are hoisted above
// imports by Vitest regardless of where they appear in the file.
vi.mock("@/hooks/use-mobile", () => ({
  default: () => true,
}));

describe("Drawer on mobile", () => {
  it("starts collapsed by default when the viewport is mobile", () => {
    const { container } = render(
      <DrawerProvider>
        <Drawer>
          <p>Content</p>
        </Drawer>
      </DrawerProvider>
    );

    expect(container.querySelector("main")).toHaveAttribute(
      "data-state",
      "collapsed"
    );
  });

  it("hides Drawer's internal DrawerToggle behind a visually-hidden placeholder for the dock-on-mobile variant", () => {
    const { container } = render(
      <DrawerProvider variant="dock-on-mobile">
        <Drawer>
          <p>Content</p>
        </Drawer>
      </DrawerProvider>
    );

    expect(container.querySelector('input[type="checkbox"]')).toBeNull();
    expect(container.querySelector("span.sr-only")?.textContent).toBe(
      "DrawerToggle"
    );
  });

  it("hides DrawerButton behind a visually-hidden placeholder for the dock-on-mobile variant", () => {
    const { container } = render(
      <DrawerProvider variant="dock-on-mobile">
        <DrawerButton />
      </DrawerProvider>
    );

    expect(container.querySelector("label")).toBeNull();
    expect(container.querySelector("span.sr-only")?.textContent).toBe(
      "DrawerButton"
    );
  });

  it("hides DrawerSide behind a visually-hidden placeholder for the dock-on-mobile variant", () => {
    const { container } = render(
      <DrawerProvider variant="dock-on-mobile">
        <DrawerSide>
          <p>Side content</p>
        </DrawerSide>
      </DrawerProvider>
    );

    expect(container.querySelector(".drawer-side")).toBeNull();
    expect(container.querySelector("span.sr-only")?.textContent).toBe(
      "DrawerSide"
    );
  });

  it("still renders the checkbox toggle normally for the default variant on mobile", () => {
    const { container } = render(
      <DrawerProvider variant="default">
        <Drawer>
          <p>Content</p>
        </Drawer>
      </DrawerProvider>
    );

    expect(container.querySelector('input[type="checkbox"]')).not.toBeNull();
  });
});
