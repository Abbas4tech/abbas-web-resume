import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { TestimonialWall } from "./testimonial-wall";

describe("TestimonialWall", () => {
  const mockProps = {
    testimonials: [
      { author: "Ada Sparkline", message: "Quote one." },
      { author: "Sam Fixture", message: "Quote two." },
    ],
  };

  it("renders every testimonial", () => {
    render(<TestimonialWall data-testid="wall" {...mockProps} />);

    const wall = screen.getByTestId("wall");
    expect(wall).toHaveClass("flex", "flex-col");

    expect(screen.getByText("Ada Sparkline")).toBeInTheDocument();
    expect(screen.getByText("Sam Fixture")).toBeInTheDocument();
    expect(screen.getByText("Quote one.")).toBeInTheDocument();
    expect(screen.getByText("Quote two.")).toBeInTheDocument();
  });
});
