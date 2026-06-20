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
});
