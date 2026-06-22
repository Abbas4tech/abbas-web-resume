import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders skeleton with correct class", () => {
    render(<Skeleton data-testid="skel" />);
    const skel = screen.getByTestId("skel");
    expect(skel).toBeInTheDocument();
    expect(skel).toHaveClass("skeleton");
  });

  it("applies custom styling classes", () => {
    render(<Skeleton className="h-10 w-10 rounded-full" data-testid="skel" />);
    expect(screen.getByTestId("skel")).toHaveClass(
      "w-10",
      "h-10",
      "rounded-full"
    );
  });
});
