import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  DropdownToggle,
} from "./dropdown";

const toggleDropdownRegex = /toggle dropdown/i;

describe("Dropdown Components", () => {
  it("renders full dropdown structure correctly", () => {
    render(
      <Dropdown data-testid="dropdown">
        <DropdownToggle>Toggle Dropdown</DropdownToggle>
        <DropdownMenu>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem isActive>Item 2 Active</DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    );

    expect(screen.getByTestId("dropdown")).toHaveClass("dropdown");

    const toggle = screen.getByRole("button", { name: toggleDropdownRegex });
    expect(toggle).toBeInTheDocument();

    expect(screen.getByText("Item 1")).toBeInTheDocument();

    // Verify active item styling
    const activeItem = screen.getByText("Item 2 Active");
    expect(activeItem.parentElement).toHaveClass("menu-sm", "font-bold");
    expect(activeItem).toHaveClass("gradient-45");
  });
});
