import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionHover } from "./motion-hover";

// Mock intersection observer for motion
class IntersectionObserverMock {
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

describe("MotionHover", () => {
  it("renders children successfully", () => {
    render(
      <MotionHover>
        <span data-testid="hover-child">Hover Me</span>
      </MotionHover>
    );

    expect(screen.getByTestId("hover-child")).toBeInTheDocument();
  });

  it("applies hover-specific classes and custom tag", () => {
    const { container } = render(
      <MotionHover as="button" className="extra-hover-class">
        Button Content
      </MotionHover>
    );

    const el = container.firstChild;
    expect(el?.nodeName.toLowerCase()).toBe("button");
    expect(el).toHaveClass("inline-block", "extra-hover-class");
  });
});
