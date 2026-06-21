import { describe, expect, it, vi } from "vitest";
import { render } from "@/test/utils";
import { MotionScrollProgress } from "./motion-scroll-progress";

// Mock useScroll so we don't throw hydration warnings in JSDOM unit tests
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

describe("MotionScrollProgress", () => {
  it("renders background track and animated fill elements with custom height/width", () => {
    const { container } = render(
      <MotionScrollProgress colorClass="bg-secondary" lineHeight={4} />
    );

    // Track element should be present with the custom height/width
    const track = container.querySelector(".opacity-10");
    expect(track).toBeInTheDocument();
    expect(track).toHaveClass("bg-secondary");

    // Fill element should also be present with the same class
    const fill = container.querySelector(".origin-top");
    expect(fill).toBeInTheDocument();
    expect(fill).toHaveClass("bg-secondary");
  });
});
