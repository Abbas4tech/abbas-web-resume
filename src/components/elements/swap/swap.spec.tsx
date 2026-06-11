import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Swap } from "./swap";

describe("Swap", () => {
  it("renders swap component correctly", () => {
    render(
      <Swap
        data-testid="swap-comp"
        offContent={<span>Off</span>}
        onContent={<span>On</span>}
      />
    );

    const label = screen.getByTestId("swap-comp");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("swap");

    const checkbox = screen.getByRole("checkbox", { name: "Toggle swap" });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass("theme-controller");

    expect(screen.getByText("On")).toBeInTheDocument();
    expect(screen.getByText("Off")).toBeInTheDocument();
  });

  it("applies active and rotate states", () => {
    render(
      <Swap active className="custom" offContent="Off" onContent="On" rotate />
    );

    const label = screen.getByText("On").closest("label");
    expect(label).toHaveClass("swap-active", "swap-rotate", "custom");
  });
});
