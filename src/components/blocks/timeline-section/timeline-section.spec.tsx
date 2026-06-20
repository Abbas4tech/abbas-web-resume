import { BLOCKS } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { TimelineSection } from "./timeline-section";

describe("TimelineSection", () => {
  const mockProps = {
    animation: "fade-up",
    entries: [
      {
        title: "Senior Developer",
        indicatorIcon: { iconCode: "fa/FaStar", name: "Star Icon" },
        metaRows: [
          {
            icon: { iconCode: "fa/FaCalendar", name: "Calendar" },
            text: "2020 - Present",
          },
        ],
        description: {
          document: {
            nodeType: BLOCKS.DOCUMENT,
            data: {},
            content: [
              {
                nodeType: BLOCKS.PARAGRAPH,
                data: {},
                content: [
                  {
                    nodeType: "text",
                    value: "Did cool things",
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          } as any,
        },
      },
    ],
  };

  it("renders timeline section with entries", async () => {
    render(<TimelineSection data-testid="timeline" {...mockProps} />);

    const timeline = screen.getByTestId("timeline");
    expect(timeline).toHaveAttribute("data-aos", "fade-up");

    // Title from TimelineEntry
    expect(screen.getByText("Senior Developer")).toBeInTheDocument();

    // Meta row
    expect(screen.getByText("2020 - Present")).toBeInTheDocument();

    // RichText description
    expect(screen.getByText("Did cool things")).toBeInTheDocument();

    // Icons
    expect(
      await screen.findByRole("img", { name: "Star Icon" })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: "Calendar" })
    ).toBeInTheDocument();
  });
});
