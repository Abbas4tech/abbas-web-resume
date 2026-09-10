import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { IconCluster } from "./icon-cluster";

describe("IconCluster", () => {
  it("renders a flex container wrapping children", () => {
    render(
      <IconCluster data-testid="cluster">
        <span>Child 1</span>
        <span>Child 2</span>
      </IconCluster>
    );

    const cluster = screen.getByTestId("cluster");
    expect(cluster).toBeInTheDocument();
    expect(cluster).toHaveClass("flex", "gap-4", "text-xl", "md:text-4xl");

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("applies custom class names", () => {
    render(
      <IconCluster className="custom-cluster" data-testid="cluster">
        <span />
      </IconCluster>
    );
    expect(screen.getByTestId("cluster")).toHaveClass("custom-cluster");
  });
});
