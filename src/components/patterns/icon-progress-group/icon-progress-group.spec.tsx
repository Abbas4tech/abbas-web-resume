import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { IconProgressGroup } from "./icon-progress-group";

describe("IconProgressGroup", () => {
  it("renders a grid container wrapping children", () => {
    render(
      <IconProgressGroup data-testid="group">
        <div>Item 1</div>
        <div>Item 2</div>
      </IconProgressGroup>
    );

    const group = screen.getByTestId("group");
    expect(group).toBeInTheDocument();
    expect(group).toHaveClass("grid", "grid-cols-1", "md:grid-cols-2");

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("applies custom classes", () => {
    render(
      <IconProgressGroup className="custom-group" data-testid="group">
        <span />
      </IconProgressGroup>
    );
    expect(screen.getByTestId("group")).toHaveClass("custom-group");
  });
});
