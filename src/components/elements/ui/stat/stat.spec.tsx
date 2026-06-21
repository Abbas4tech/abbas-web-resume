import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Stat, StatDescription, StatFigure, Stats, StatTitle } from "./stat";

describe("Stat Components", () => {
  it("renders full stat block layout correctly", () => {
    render(
      <Stats data-testid="stats-group">
        <Stat>
          <StatFigure>Fig</StatFigure>
          <StatTitle>Title</StatTitle>
          <StatDescription>Value 100</StatDescription>
        </Stat>
      </Stats>
    );

    const group = screen.getByTestId("stats-group");
    expect(group).toHaveClass("stats");

    expect(screen.getByText("Fig")).toHaveClass("stat-figure");
    expect(screen.getByText("Title")).toHaveClass("stat-title");
    expect(screen.getByText("Value 100")).toHaveClass("stat-value");
  });

  it("applies custom classes to components", () => {
    render(
      <Stats className="custom-stats">
        <Stat className="custom-stat">
          <StatTitle className="custom-title">T</StatTitle>
        </Stat>
      </Stats>
    );

    expect(screen.getByText("T")).toHaveClass("custom-title");
  });
});
