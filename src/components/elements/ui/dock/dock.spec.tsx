import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Dock, DockItem } from "./dock";

const homeRegex = /home/i;
const itemRegex = /item/i;

describe("Dock Components", () => {
  it("renders dock and items correctly", () => {
    const { container } = render(
      <Dock>
        <DockItem href="/home" icon={<span>HomeIcon</span>}>
          Home
        </DockItem>
        <DockItem href="/about" icon={<span>AboutIcon</span>}>
          About
        </DockItem>
      </Dock>
    );

    const dock = container.querySelector(".dock");
    expect(dock).toBeInTheDocument();
    expect(dock).toHaveClass("dock-md");

    const homeLink = screen.getByRole("link", { name: homeRegex });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/home");
    expect(screen.getByText("HomeIcon")).toBeInTheDocument();
  });

  it("applies custom classes to dock and items", () => {
    const { container } = render(
      <Dock className="custom-dock">
        <DockItem className="custom-item" href="/test" icon={<span />}>
          Item
        </DockItem>
      </Dock>
    );

    expect(container.querySelector(".dock")).toHaveClass("custom-dock");
    expect(screen.getByRole("link", { name: itemRegex })).toHaveClass(
      "custom-item"
    );
  });
});
