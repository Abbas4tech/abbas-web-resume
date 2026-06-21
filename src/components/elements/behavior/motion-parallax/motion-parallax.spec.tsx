import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/utils";
import { MotionParallax } from "./motion-parallax";

// Mock motion hooks if needed or test element mounting
vi.mock("motion/react", async (importOriginal) => {
  const original = await importOriginal<typeof import("motion/react")>();
  return {
    ...original,
    useScroll: vi.fn(() => ({
      scrollY: { get: () => 0, getVelocity: () => 0, on: vi.fn(() => vi.fn()) },
      scrollYProgress: {
        get: () => 0,
        getVelocity: () => 0,
        on: vi.fn(() => vi.fn()),
      },
    })),
  };
});

describe("MotionParallax", () => {
  it("renders children inside a scroll container wrapper", () => {
    render(
      <MotionParallax speed={0.5}>
        <div data-testid="parallax-child">Parallax Image Content</div>
      </MotionParallax>
    );

    // Should render the child content correctly
    expect(screen.getByTestId("parallax-child")).toBeInTheDocument();
    expect(screen.getByText("Parallax Image Content")).toBeInTheDocument();
  });

  it("applies the overflow: hidden class and custom className", () => {
    const { container } = render(
      <MotionParallax className="custom-parallax-class">
        <div>Child</div>
      </MotionParallax>
    );

    const wrapper = container.querySelector(".custom-parallax-class");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveStyle({ overflow: "hidden" });
  });
});
