import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { StatGroup } from "./stat-group";

describe("StatGroup", () => {
  const mockProps = {
    label: "Total Projects",
    value: "42",
    icon: { iconCode: "fa/FaFolder", name: "Folder Icon" },
  };

  it("renders stat layout correctly with label and value", async () => {
    render(<StatGroup data-testid="stat-row" {...mockProps} />);

    const container = screen.getByTestId("stat-row");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("stats");

    expect(screen.getByText("Total Projects")).toBeInTheDocument();
    expect(screen.getByText("Total Projects")).toHaveClass("stat-title");

    expect(screen.getByText("42")).toBeInTheDocument();

    const icon = await screen.findByRole("img", { name: "Folder Icon" });
    expect(icon).toBeInTheDocument();
  });

  it("applies custom class names", () => {
    render(
      <StatGroup
        className="custom-stat"
        data-testid="stat-row"
        {...mockProps}
      />
    );
    expect(screen.getByTestId("stat-row")).toHaveClass("custom-stat");
  });
});
