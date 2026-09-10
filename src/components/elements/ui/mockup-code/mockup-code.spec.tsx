import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { MockupCode, MockupCodeLine } from "./mockup-code";

describe("MockupCode", () => {
  it("renders code lines with their prefix", () => {
    const { container } = render(
      <MockupCode>
        <MockupCodeLine prefix="$">npm i daisyui</MockupCodeLine>
      </MockupCode>
    );

    expect(container.querySelector(".mockup-code")).toBeInTheDocument();
    expect(screen.getByText("npm i daisyui")).toBeInTheDocument();

    const line = container.querySelector("pre");
    expect(line).toHaveAttribute("data-prefix", "$");
  });

  it("applies custom classes", () => {
    const { container } = render(<MockupCode className="custom-code" />);
    expect(container.querySelector(".mockup-code")).toHaveClass("custom-code");
  });
});
