import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { MockupWindow, MockupWindowBody } from "./mockup-window";

describe("MockupWindow", () => {
  it("renders window frame and body", () => {
    const { container } = render(
      <MockupWindow>
        <MockupWindowBody>Browser Content</MockupWindowBody>
      </MockupWindow>
    );

    expect(container.querySelector(".mockup-window")).toBeInTheDocument();
    expect(screen.getByText("Browser Content")).toBeInTheDocument();
  });

  it("applies custom classes", () => {
    const { container } = render(
      <MockupWindow className="custom-window">
        <MockupWindowBody className="custom-body">Content</MockupWindowBody>
      </MockupWindow>
    );

    expect(container.querySelector(".mockup-window")).toHaveClass(
      "custom-window"
    );
    expect(screen.getByText("Content")).toHaveClass("custom-body");
  });
});
