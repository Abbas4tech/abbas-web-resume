import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { ProcessSteps } from "./process-steps";

describe("ProcessSteps", () => {
  const mockProps = {
    steps: [
      { title: "Discover", description: "Understand the problem." },
      { title: "Ship", description: "Deploy and iterate." },
    ],
  };

  it("renders every step's title and description in order", () => {
    render(<ProcessSteps {...mockProps} />);

    const titles = screen.getAllByRole("heading");
    expect(titles.map((el) => el.textContent)).toEqual(["Discover", "Ship"]);
    expect(screen.getByText("Understand the problem.")).toBeInTheDocument();
    expect(screen.getByText("Deploy and iterate.")).toBeInTheDocument();
  });

  it("falls back to a numbered indicator when no icon is given", () => {
    render(<ProcessSteps {...mockProps} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders a native Timeline when layout is timeline", () => {
    const { container } = render(
      <ProcessSteps {...mockProps} layout="timeline" />
    );

    expect(container.querySelector(".timeline")).toBeInTheDocument();
    expect(screen.getByText("Discover")).toBeInTheDocument();
    expect(screen.getByText("Understand the problem.")).toBeInTheDocument();
  });
});
