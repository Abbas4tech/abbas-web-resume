import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionTiltCard } from "./motion-tilt-card";

// Mock intersection observer for motion
class IntersectionObserverMock {
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

describe("MotionTiltCard", () => {
  it("renders children successfully", () => {
    render(
      <MotionTiltCard>
        <div data-testid="card-child">Project Info</div>
      </MotionTiltCard>
    );

    expect(screen.getByTestId("card-child")).toBeInTheDocument();
  });

  it("applies class names and perspective styling wrapper", () => {
    const { container } = render(
      <MotionTiltCard className="custom-card-class">
        <span>Content</span>
      </MotionTiltCard>
    );

    const el = container.firstChild;
    expect(el).toHaveClass("group", "perspective-1000", "custom-card-class");
  });
});
