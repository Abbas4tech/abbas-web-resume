import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import {
  Timeline,
  TimelineEnd,
  TimelineItem,
  TimelineMiddle,
  TimelineStart,
} from "./timeline";

describe("Timeline", () => {
  it("renders a vertical timeline by default", () => {
    const { container } = render(
      <Timeline>
        <TimelineItem>
          <TimelineStart>2023</TimelineStart>
          <TimelineMiddle>•</TimelineMiddle>
          <TimelineEnd>Started</TimelineEnd>
        </TimelineItem>
      </Timeline>
    );

    const timeline = container.querySelector(".timeline");
    expect(timeline).toHaveClass("timeline-vertical");
    expect(screen.getByText("2023")).toHaveClass("timeline-start");
    expect(screen.getByText("Started")).toHaveClass("timeline-end");
  });

  it("applies the horizontal direction", () => {
    const { container } = render(<Timeline direction="horizontal" />);
    expect(container.querySelector(".timeline")).toHaveClass(
      "timeline-horizontal"
    );
  });
});
