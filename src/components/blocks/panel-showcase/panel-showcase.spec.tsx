import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { PanelShowcase } from "./panel-showcase";

describe("PanelShowcase", () => {
  const mockProps = {
    panels: [
      {
        title: "My Skills",
        headingIcon: { iconCode: "fa/FaCode", name: "Code Icon" },
        rows: [
          {
            label: "React",
            progress: 85,
            icons: [{ iconCode: "fa/FaReact", name: "React Icon" }],
          },
        ],
      },
    ],
  };

  it("renders a showcase panel with heading and progress rows", async () => {
    render(<PanelShowcase data-testid="showcase" {...mockProps} />);

    // SectionHeading
    expect(screen.getByText("My Skills")).toBeInTheDocument();

    // Icons
    expect(
      await screen.findByRole("img", { name: "Code Icon", hidden: true })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: "React Icon" })
    ).toBeInTheDocument();

    // Progress bar
    const progressBar = screen.getByRole("progressbar", { name: "React" });
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute("aria-valuenow", "85");
  });

  it("renders a radial progress indicator when a row's variant is radial", () => {
    render(
      <PanelShowcase
        panels={[
          {
            title: "My Skills",
            headingIcon: { iconCode: "fa/FaCode", name: "Code Icon" },
            rows: [
              {
                label: "React",
                progress: 85,
                variant: "radial",
                icons: [{ iconCode: "fa/FaReact", name: "React Icon" }],
              },
            ],
          },
        ]}
      />
    );

    const progressBar = screen.getByRole("progressbar", { name: "React" });
    expect(progressBar).toHaveClass("radial-progress");
    expect(progressBar).toHaveAttribute("aria-valuenow", "85");
  });

  it("renders a dense skills-matrix table when layout is table", () => {
    render(
      <PanelShowcase
        layout="table"
        panels={[
          {
            title: "Frontend",
            headingIcon: { iconCode: "fa/FaCode", name: "Code Icon" },
            rows: [
              {
                label: "React",
                progress: 85,
                icons: [{ iconCode: "fa/FaReact", name: "React Icon" }],
              },
            ],
          },
        ]}
      />
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Category" })
    ).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Frontend" })).toBeInTheDocument();

    const progressBar = screen.getByRole("progressbar", { name: "React" });
    expect(progressBar).toHaveAttribute("value", "85");
  });
});
