import type { Meta, StoryObj } from "@storybook/react";
import { TimelineEntry } from "./timeline-entry";
import { baseMock, withTechBadgesMock } from "./timeline-entry.mock";

const meta = {
  title: "Patterns/TimelineEntry",
  component: TimelineEntry,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TimelineEntry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const WithoutMeta: Story = {
  args: {
    ...baseMock,
    metaRows: [],
  },
};

export const WithTechBadges: Story = {
  args: {
    ...withTechBadgesMock,
  },
};
