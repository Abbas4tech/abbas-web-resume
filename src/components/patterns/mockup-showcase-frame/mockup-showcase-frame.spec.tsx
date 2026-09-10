import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { MockupShowcaseFrame } from "./mockup-showcase-frame";

describe("MockupShowcaseFrame", () => {
  it("renders a browser frame for variant='browser'", () => {
    const { container } = render(
      <MockupShowcaseFrame variant="browser">Content</MockupShowcaseFrame>
    );
    expect(container.querySelector(".mockup-browser")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders a phone frame for variant='phone'", () => {
    const { container } = render(
      <MockupShowcaseFrame variant="phone">Content</MockupShowcaseFrame>
    );
    expect(container.querySelector(".mockup-phone")).toBeInTheDocument();
    expect(screen.getByText("Content")).toHaveClass("mockup-phone-display");
  });

  it("renders a code frame for variant='code'", () => {
    const { container } = render(
      <MockupShowcaseFrame variant="code">Content</MockupShowcaseFrame>
    );
    expect(container.querySelector(".mockup-code")).toBeInTheDocument();
  });

  it("defaults to a window frame", () => {
    const { container } = render(
      <MockupShowcaseFrame>Content</MockupShowcaseFrame>
    );
    expect(container.querySelector(".mockup-window")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
