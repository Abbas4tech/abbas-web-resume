import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionWrapper } from "./motion-wrapper";

// Mock intersection observer for motion
class IntersectionObserverMock {
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

describe("MotionWrapper", () => {
  it("renders children successfully", () => {
    render(
      <MotionWrapper>
        <div data-testid="child">Hello Motion</div>
      </MotionWrapper>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Hello Motion")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <MotionWrapper className="custom-test-class">
        <span>Test</span>
      </MotionWrapper>
    );
    expect(container.firstChild).toHaveClass("custom-test-class");
  });

  it("renders as a different element", () => {
    const { container } = render(
      <MotionWrapper as="section">
        <span>Test</span>
      </MotionWrapper>
    );
    expect(container.firstChild?.nodeName.toLowerCase()).toBe("section");
  });
});
