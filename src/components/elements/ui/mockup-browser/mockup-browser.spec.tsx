import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { MockupBrowser, MockupBrowserToolbar } from "./mockup-browser";

describe("MockupBrowser", () => {
  it("renders browser frame and content", () => {
    const { container } = render(
      <MockupBrowser>
        <div>Browser Content</div>
      </MockupBrowser>
    );

    expect(container.querySelector(".mockup-browser")).toBeInTheDocument();
    expect(screen.getByText("Browser Content")).toBeInTheDocument();
  });

  it("renders the toolbar's url in the input slot", () => {
    render(<MockupBrowserToolbar url="https://example.com" />);
    expect(screen.getByText("https://example.com")).toHaveClass("input");
  });

  it("applies custom classes", () => {
    const { container } = render(<MockupBrowser className="custom-browser" />);
    expect(container.querySelector(".mockup-browser")).toHaveClass(
      "custom-browser"
    );
  });
});
