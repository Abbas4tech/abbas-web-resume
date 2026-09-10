import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import type { TimelineEntryProps } from "./timeline-entry";
import { TimelineEntry } from "./timeline-entry";

describe("TimelineEntry", () => {
  const mockProps: TimelineEntryProps = {
    title: "Software Engineer",
    indicatorIcon: { iconCode: "fa/FaBriefcase", name: "Briefcase" },
    metaRows: [
      {
        icon: { iconCode: "fa/FaMapMarkerAlt", name: "Location" },
        text: "New York, NY",
      },
      {
        icon: { iconCode: "fa/FaCalendar", name: "Calendar" },
        text: "Jan 2020 - Present",
      },
    ],
    body: <div data-testid="timeline-body">Worked on cool stuff.</div>,
  };

  it("renders the timeline entry basic structure", async () => {
    render(<TimelineEntry {...mockProps} />);

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();

    // Main indicator icon
    expect(
      await screen.findByRole("img", { name: "Briefcase" })
    ).toBeInTheDocument();

    // Body content
    expect(screen.getByTestId("timeline-body")).toHaveTextContent(
      "Worked on cool stuff."
    );
  });

  it("renders all meta rows with their icons", async () => {
    render(<TimelineEntry {...mockProps} />);

    // Row texts
    expect(screen.getByText("New York, NY")).toBeInTheDocument();
    expect(screen.getByText("Jan 2020 - Present")).toBeInTheDocument();

    // Row icons
    expect(
      await screen.findByRole("img", { name: "Location" })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: "Calendar" })
    ).toBeInTheDocument();
  });

  it("scales meta row text up on desktop, matching the pre-refactor ambient size (ADR-0020 regression guard)", () => {
    // ExperienceCard (pre-refactor) had no explicit text size on these rows, so
    // they inherited the ambient layout's `text-sm md:text-lg`. Consolidating
    // them into one generic metaRows row hardcoded `text-sm` with no responsive
    // variant, silently shrinking this text ~22% on desktop and making it
    // non-responsive. See docs/adr/0020-font-loading-and-typography-continuity-
    // audit.md, Finding 8a.
    render(<TimelineEntry {...mockProps} />);
    const row = screen.getByText("New York, NY").closest("div");
    expect(row).toHaveClass("text-sm", "md:text-lg");
  });

  it("renders a badges meta row as a TechBadgeCloud instead of plain text", () => {
    render(
      <TimelineEntry
        {...mockProps}
        metaRows={[
          ...mockProps.metaRows,
          {
            type: "badges",
            items: [
              {
                label: "React",
                icon: { iconCode: "si/SiReact", name: "React" },
              },
              { label: "TypeScript" },
            ],
          },
        ]}
      />
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });
});
