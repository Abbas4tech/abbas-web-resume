import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Container } from "./container";

describe("Container", () => {
  it("renders container with default classes", () => {
    const { container } = render(<Container>Content</Container>);
    const el = container.querySelector(".container");
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass("scrollbar-hide", "mx-auto", "overflow-hidden");
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies custom classes", () => {
    const { container } = render(<Container className="custom-container" />);
    expect(container.querySelector(".container")).toHaveClass(
      "custom-container"
    );
  });
});
