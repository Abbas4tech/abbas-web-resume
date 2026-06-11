import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Icon } from "./icon";

const invalidRegex = /invalid/i;

describe("Icon", () => {
  it("renders a dynamic icon correctly", () => {
    // Dynamic import takes a moment, but testing-library handles it
    // or we can test the fallback state if it renders sync.
    const { container } = render(
      <Icon iconCode="fa/FaHome" name="Home Icon" />
    );

    // Check if the wrapper renders and tooltip applies
    const wrapper = container.querySelector(".tooltip");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute("data-tip", "Home Icon");
  });

  it("handles missing icons gracefully with a fallback", () => {
    render(<Icon iconCode="invalid/InvalidIcon" name="Invalid" />);
    // Falls back to MdError which has role="img"
    const fallback = screen.getByRole("img", { name: invalidRegex });
    expect(fallback).toBeInTheDocument();
  });

  it("applies color and size styling", async () => {
    render(
      <Icon
        color="#ff0000"
        iconCode="fa/FaHome"
        name="Styled Icon"
        size="2rem"
      />
    );
    const icon = await screen.findByRole("img", { name: "Styled Icon" });
    expect(icon).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("disables tooltip when showTooltip is false", () => {
    const { container } = render(
      <Icon iconCode="fa/FaHome" showTooltip={false} />
    );
    expect(container.querySelector(".tooltip")).not.toBeInTheDocument();
  });
});
