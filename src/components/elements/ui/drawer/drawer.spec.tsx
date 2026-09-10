import { render as rtlRender } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/utils";
import {
  Drawer,
  DrawerButton,
  DrawerPageContent,
  DrawerProvider,
  DrawerSide,
  DrawerSideItem,
  DrawerSideMenu,
} from "./drawer";

const clickableRegex = /clickable item/i;
const useDrawerErrorRegex = /useDrawer must be used within a DrawerProvider/i;

describe("Drawer Components", () => {
  it("renders full drawer layout correctly", () => {
    const { container } = render(
      <Drawer>
        <DrawerPageContent>
          <DrawerButton data-testid="drawer-btn" />
          <p>Main Content</p>
        </DrawerPageContent>
        <DrawerSide>
          <DrawerSideMenu>
            <DrawerSideItem>Menu Item 1</DrawerSideItem>
          </DrawerSideMenu>
        </DrawerSide>
      </Drawer>
    );

    expect(screen.getByText("Main Content")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-btn")).toBeInTheDocument();
    expect(screen.getByText("Menu Item 1")).toBeInTheDocument();

    // Check internal checkbox state
    const checkbox = container.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass("drawer-toggle");
  });

  it("renders a side item's children as plain content, with no interactive wrapper of its own", () => {
    // DrawerSideItem is a pure <li> wrapper — it used to also render a
    // <button onClick={toggleSidebar}>, but that nested a second interactive
    // control around whatever real link/button the caller passed as
    // children (an axe "nested-interactive" violation). Closing the drawer
    // on click is now the caller's responsibility, wired directly onto the
    // real control — see SidebarNav's "closes the drawer" test.
    render(
      <Drawer>
        <DrawerSideItem>Clickable Item</DrawerSideItem>
      </Drawer>
    );

    expect(screen.getByText(clickableRegex)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("throws when a Drawer subcomponent is rendered without a DrawerProvider", () => {
    // Deliberately use the raw RTL render here, bypassing the custom @/test/utils
    // wrapper (which always supplies a DrawerProvider), to exercise useDrawer's
    // own guard. React logs the thrown error to the console; suppress that noise.
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    expect(() =>
      rtlRender(
        <Drawer>
          <p>Content</p>
        </Drawer>
      )
    ).toThrow(useDrawerErrorRegex);

    consoleError.mockRestore();
  });

  it("applies right-side styling to the Drawer and its side items", () => {
    const { container } = rtlRender(
      <DrawerProvider side="right">
        <Drawer>
          <DrawerSideItem>Right Item</DrawerSideItem>
        </Drawer>
      </DrawerProvider>
    );

    expect(container.querySelector(".drawer")).toHaveClass("drawer-end");
    expect(screen.getByText("Right Item").closest("li")).toHaveClass(
      "pr-0",
      "pl-2"
    );
  });

  it("defaults to left-side styling when no side is specified", () => {
    const { container } = rtlRender(
      <DrawerProvider>
        <Drawer>
          <DrawerSideItem>Left Item</DrawerSideItem>
        </Drawer>
      </DrawerProvider>
    );

    expect(container.querySelector(".drawer")).not.toHaveClass("drawer-end");
    expect(screen.getByText("Left Item").closest("li")).not.toHaveClass("pr-0");
  });
});
