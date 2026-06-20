import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Tooltip } from "./tooltip";

describe("Tooltip", () => {
  it("renders tooltip wrapping children", () => {
    render(
      <Tooltip data-testid="tooltip" position="right" tip="Test Tip">
        <button type="button">Hover me</button>
      </Tooltip>
    );

    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass("tooltip", "tooltip-right");
    expect(tooltip).toHaveAttribute("data-tip", "Test Tip");

    expect(
      screen.getByRole("button", { name: "Hover me" })
    ).toBeInTheDocument();
  });

  it("applies custom class names", () => {
    render(
      <Tooltip className="custom-tt" data-testid="tt-test" tip="tip">
        Child
      </Tooltip>
    );
    expect(screen.getByTestId("tt-test")).toHaveClass("custom-tt");
  });
});
