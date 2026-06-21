import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionDraggable } from "./motion-draggable";

// Mock intersection observer for motion
class IntersectionObserverMock {
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

describe("MotionDraggable", () => {
  it("renders children successfully", () => {
    render(
      <MotionDraggable>
        <div data-testid="draggable-child">Drag Me</div>
      </MotionDraggable>
    );

    expect(screen.getByTestId("draggable-child")).toBeInTheDocument();
    expect(screen.getByText("Drag Me")).toBeInTheDocument();
  });

  it("applies drag-specific classes and custom tag", () => {
    const { container } = render(
      <MotionDraggable as="span" className="extra-class">
        Content
      </MotionDraggable>
    );

    const el = container.firstChild;
    expect(el?.nodeName.toLowerCase()).toBe("span");
    expect(el).toHaveClass(
      "cursor-grab",
      "active:cursor-grabbing",
      "extra-class"
    );
  });
});
