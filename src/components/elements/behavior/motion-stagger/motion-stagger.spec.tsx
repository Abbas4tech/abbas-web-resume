import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MotionStaggerContainer, MotionStaggerItem } from "./motion-stagger";
// `?raw` reads source text: motion/react never actually calls
// IntersectionObserver.observe() under jsdom (verified — a spy wired to the
// stubbed global stays at 0 calls regardless of which element has
// whileInView), so this specific decision can only be locked in by asserting
// on the code structure itself, not on observed runtime behavior.
import motionStaggerSource from "./motion-stagger.tsx?raw";

// Mock intersection observer for motion
class IntersectionObserverMock {
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

const whileInViewPropRegex = /whileInView=/;

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

  it("keeps whileInView on the item, not the container (ADR-0020 regression guard)", () => {
    // Root cause of the bug this locks in: CardGrid used to wrap every card in
    // one MotionStaggerContainer whose whileInView lived on the container
    // itself. Since that container spans the full grid (often much taller than
    // the viewport), its top edge was already visible on page load, so its
    // whileInView fired immediately on mount and that "visible" state
    // propagated to every child card at once — all cards animated together on
    // load regardless of how far down the page they actually sat. The fix
    // moved the trigger onto each MotionStaggerItem so every card tracks its
    // own visibility independently. See docs/adr/0020-font-loading-and-
    // typography-continuity-audit.md, Finding 8a.
    //
    // Asserted at the source level, not by observing runtime behavior: in
    // jsdom, motion/react never calls IntersectionObserver.observe() at all
    // (verified — a spy wired to the stubbed global stays at 0 calls no matter
    // which element has whileInView), so a shared container-level trigger and
    // a per-item trigger are indistinguishable from rendered output alone here.
    const [containerSection, itemSection] = motionStaggerSource.split(
      "const MotionStaggerItem"
    );
    expect(itemSection).toBeDefined();
    expect(containerSection).not.toMatch(whileInViewPropRegex);
    expect(itemSection).toMatch(whileInViewPropRegex);
  });

  it("starts each item hidden (opacity 0, scaled down) until it individually enters view", () => {
    render(
      <MotionStaggerContainer>
        <MotionStaggerItem data-testid="item">Card</MotionStaggerItem>
      </MotionStaggerContainer>
    );
    // IntersectionObserverMock never invokes its callback, so whileInView never
    // fires and the item stays in its initial "hidden" variant — this is the
    // pre-animation state a real card sits in before it scrolls into view.
    expect(screen.getByTestId("item")).toHaveStyle({ opacity: "0" });
  });

  it("keeps the container itself free of a visibility-hiding style (structural wrapper only)", () => {
    render(
      <MotionStaggerContainer data-testid="grid">
        <MotionStaggerItem>Card</MotionStaggerItem>
      </MotionStaggerContainer>
    );
    // The container must not carry its own initial/whileInView opacity-hiding
    // variant — that's the exact mechanism the regression guard above protects
    // against reintroducing.
    const style = screen.getByTestId("grid").getAttribute("style");
    expect(style === null || !style.includes("opacity: 0")).toBe(true);
  });
});
