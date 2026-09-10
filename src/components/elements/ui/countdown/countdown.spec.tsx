import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Countdown } from "./countdown";

describe("Countdown", () => {
  it("renders the value with the countdown CSS variable and an accessible label", () => {
    const { container } = render(
      <Countdown aria-label="15 days remaining" value={15} />
    );

    expect(container.querySelector(".countdown")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();

    const digit = screen.getByLabelText("15 days remaining");
    expect(digit.tagName).toBe("OUTPUT");
    expect(digit.style.getPropertyValue("--value")).toBe("15");
  });

  it("falls back to the numeric value as the aria-label when none is given", () => {
    render(<Countdown value={7} />);
    expect(screen.getByLabelText("7")).toBeInTheDocument();
  });
});
