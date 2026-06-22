import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import {
  Drawer,
  DrawerButton,
  DrawerPageContent,
  DrawerSide,
  DrawerSideItem,
  DrawerSideMenu,
} from "./drawer";

const clickableRegex = /clickable item/i;

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

  it("can interact with drawer sidebar item", () => {
    render(
      <Drawer>
        <DrawerSideItem>Clickable Item</DrawerSideItem>
      </Drawer>
    );

    const btn = screen.getByRole("button", { name: clickableRegex });
    expect(btn).toBeInTheDocument();
  });
});
