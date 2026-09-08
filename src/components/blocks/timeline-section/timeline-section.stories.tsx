import type { Meta, StoryObj } from "@storybook/react";
import { TimelineSection } from "./timeline-section";
import { baseMock, withTechStackMock } from "./timeline-section.mock";

const meta = {
  title: "Blocks/TimelineSection",
  component: TimelineSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TimelineSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const SingleEntry: Story = {
  args: {
    ...baseMock,
    entries: [baseMock.entries[0]],
  },
};

export const WithTechStack: Story = {
  args: {
    ...withTechStackMock,
  },
};
