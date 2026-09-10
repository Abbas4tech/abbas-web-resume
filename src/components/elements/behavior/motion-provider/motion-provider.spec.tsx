import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { MotionProvider } from "./motion-provider";

describe("MotionProvider", () => {
  it("renders its children", () => {
    render(
      <MotionProvider>
        <p>Inside motion provider</p>
      </MotionProvider>
    );

    expect(screen.getByText("Inside motion provider")).toBeInTheDocument();
  });

  it("renders multiple children without altering their order", () => {
    render(
      <MotionProvider>
        <span>First</span>
        <span>Second</span>
      </MotionProvider>
    );

    const first = screen.getByText("First");
    const second = screen.getByText("Second");
    expect(first.compareDocumentPosition(second)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });
});
