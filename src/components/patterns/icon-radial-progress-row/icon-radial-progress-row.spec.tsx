import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { IconRadialProgressRow } from "./icon-radial-progress-row";

describe("IconRadialProgressRow", () => {
  it("renders children and a radial progress ring correctly", () => {
    render(
      <IconRadialProgressRow data-testid="row" progress={75}>
        <span data-testid="icon-child">Icon 1</span>
        <span data-testid="icon-child">Icon 2</span>
      </IconRadialProgressRow>
    );

    const row = screen.getByTestId("row");
    expect(row).toBeInTheDocument();
    expect(row).toHaveClass("grid", "grid-cols-2", "items-center");

    const children = screen.getAllByTestId("icon-child");
    expect(children).toHaveLength(2);
    expect(children[0]).toHaveTextContent("Icon 1");

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass("radial-progress");
    expect(progressBar).toHaveAttribute("aria-valuenow", "75");
  });

  it("applies custom styling", () => {
    render(
      <IconRadialProgressRow
        className="custom-row"
        data-testid="row"
        progress={50}
      />
    );
    expect(screen.getByTestId("row")).toHaveClass("custom-row");
  });
});
