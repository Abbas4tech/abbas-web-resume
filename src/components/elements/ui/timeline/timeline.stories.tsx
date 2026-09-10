import type { Meta, StoryObj } from "@storybook/react";
import {
  Timeline,
  TimelineEnd,
  TimelineItem,
  TimelineMiddle,
  TimelineStart,
} from "./timeline";
import { baseMock } from "./timeline.mock";

const meta = {
  title: "Elements/UI/Timeline",
  component: Timeline,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Timeline>
      {baseMock.events.map((event) => (
        <TimelineItem key={event.title}>
          <TimelineStart>{event.label}</TimelineStart>
          <TimelineMiddle>•</TimelineMiddle>
          <TimelineEnd className="timeline-box">{event.title}</TimelineEnd>
        </TimelineItem>
      ))}
    </Timeline>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Timeline direction="horizontal">
      {baseMock.events.map((event) => (
        <TimelineItem key={event.title}>
          <TimelineStart>{event.label}</TimelineStart>
          <TimelineMiddle>•</TimelineMiddle>
          <TimelineEnd className="timeline-box">{event.title}</TimelineEnd>
        </TimelineItem>
      ))}
    </Timeline>
  ),
};
