import { describe, expect, it } from "vitest";
import { render } from "@/test/utils";
import { Divider } from "./divider";

describe("Divider", () => {
  it("renders horizontal divider by default", () => {
    const { container } = render(<Divider />);
    const el = container.querySelector(".divider");
    expect(el).toBeInTheDocument();
    expect(el).not.toHaveClass("divider-vertical");
  });

  it("renders vertical divider when specified", () => {
    const { container } = render(<Divider orientation="vertical" />);
    const el = container.querySelector(".divider");
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass("divider-vertical");
  });

  it("applies custom classes", () => {
    const { container } = render(<Divider className="custom-divider" />);
    expect(container.querySelector(".divider")).toHaveClass("custom-divider");
  });
});
