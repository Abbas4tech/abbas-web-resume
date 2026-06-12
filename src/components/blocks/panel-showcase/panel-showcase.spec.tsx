import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { PanelShowcase } from "./panel-showcase";

describe("PanelShowcase", () => {
  const mockProps = {
    animation: "fade-up",
    panels: [
      {
        title: "My Skills",
        headingIcon: { iconCode: "fa/FaCode", name: "Code Icon" },
        rows: [
          {
            progress: 85,
            icons: [{ iconCode: "fa/FaReact", name: "React Icon" }],
          },
        ],
      },
    ],
  };

  it("renders a showcase panel with heading and progress rows", async () => {
    render(<PanelShowcase data-testid="showcase" {...mockProps} />);

    const showcase = screen.getByTestId("showcase");
    expect(showcase).toHaveAttribute("data-aos", "fade-up");

    // SectionHeading
    expect(screen.getByText("My Skills")).toBeInTheDocument();

    // Icons
    expect(
      await screen.findByRole("img", { name: "Code Icon" })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: "React Icon" })
    ).toBeInTheDocument();

    // Progress bar
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "85");
  });
});
