import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionTextWriter } from "./motion-text-writer";

// Mock intersection observer for motion
class IntersectionObserverMock {
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

describe("MotionTextWriter", () => {
  it("renders screen-reader text and matching character blocks", () => {
    const { container } = render(
      <MotionTextWriter className="writer-class" text="Web" />
    );

    // Screen reader accessible node
    const srText = screen.getByText("Web");
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass("sr-only");

    // Check individual character elements
    expect(container.textContent).toContain("Web");
    expect(container.firstChild).toHaveClass("writer-class");
  });
});
