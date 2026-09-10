import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Menu, MenuItem } from "./menu";

describe("Menu Components", () => {
  it("renders menu and items", () => {
    const { container } = render(
      <Menu>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
      </Menu>
    );

    expect(container.querySelector(".menu")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    // Items should be list items
    expect(screen.getByText("Item 1").tagName).toBe("LI");
  });

  it("applies custom classes", () => {
    const { container } = render(
      <Menu className="custom-menu">
        <MenuItem className="custom-item">Item</MenuItem>
      </Menu>
    );

    expect(container.querySelector(".menu")).toHaveClass("custom-menu");
    expect(screen.getByText("Item")).toHaveClass("custom-item");
  });
});
