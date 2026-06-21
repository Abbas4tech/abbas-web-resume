import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionStaggerContainer, MotionStaggerItem } from "./motion-stagger";

// Mock intersection observer for motion
class IntersectionObserverMock {
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

describe("MotionStagger", () => {
  it("renders container and staggered items successfully", () => {
    render(
      <MotionStaggerContainer data-testid="container">
        <MotionStaggerItem data-testid="item-1">Item 1</MotionStaggerItem>
        <MotionStaggerItem data-testid="item-2">Item 2</MotionStaggerItem>
      </MotionStaggerContainer>
    );

    expect(screen.getByTestId("container")).toBeInTheDocument();
    expect(screen.getByTestId("item-1")).toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
  });

  it("applies container classes and custom tag", () => {
    const { container } = render(
      <MotionStaggerContainer as="ul" className="list-class">
        <MotionStaggerItem>Item</MotionStaggerItem>
      </MotionStaggerContainer>
    );

    expect(container.firstChild?.nodeName.toLowerCase()).toBe("ul");
    expect(container.firstChild).toHaveClass("list-class");
  });

  it("applies item custom tag and classes", () => {
    render(
      <MotionStaggerContainer>
        <MotionStaggerItem as="li" className="item-class" data-testid="item">
          Item Text
        </MotionStaggerItem>
      </MotionStaggerContainer>
    );

    const item = screen.getByTestId("item");
    expect(item.nodeName.toLowerCase()).toBe("li");
    expect(item).toHaveClass("item-class");
  });
});
