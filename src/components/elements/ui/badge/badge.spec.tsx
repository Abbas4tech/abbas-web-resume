import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders content correctly", () => {
    render(<Badge>New!</Badge>);
    expect(screen.getByText("New!")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    const { container } = render(<Badge variant="primary">Primary</Badge>);
    expect(container.querySelector(".badge")).toHaveClass(
      "badge",
      "badge-primary"
    );
  });

  it("applies custom className properties", () => {
    const { container } = render(
      <Badge className="badge-lg badge-outline">Large Outline</Badge>
    );
    expect(container.querySelector(".badge")).toHaveClass(
      "badge-lg",
      "badge-outline"
    );
  });
});
