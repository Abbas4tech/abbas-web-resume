import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { RadialProgress } from "./radial-progress";

describe("RadialProgress", () => {
  it("renders a radial progress ring with correct aria attributes", () => {
    render(<RadialProgress count={70} />);

    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveClass("radial-progress");
    expect(progress).toHaveAttribute("aria-valuenow", "70");
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
    expect(progress.style.getPropertyValue("--value")).toBe("70");

    expect(screen.getByText("70%")).toBeInTheDocument();
  });

  it("applies custom classes", () => {
    render(<RadialProgress className="custom-radial" count={50} />);
    expect(screen.getByRole("progressbar")).toHaveClass("custom-radial");
  });
});
