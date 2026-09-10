import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Progress } from "./progress";

describe("Progress", () => {
  it("renders progress bar with correct aria attributes", () => {
    render(<Progress count={75} />);

    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute("aria-valuenow", "75");
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "100");

    // Inner indicator
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("applies custom classes", () => {
    render(<Progress className="custom-progress" count={50} />);
    expect(screen.getByRole("progressbar")).toHaveClass("custom-progress");
  });
});
