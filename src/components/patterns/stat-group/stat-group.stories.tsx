import type { Meta, StoryObj } from "@storybook/react";
import { StatGroup } from "./stat-group";
import { baseMock } from "./stat-group.mock";

const meta = {
  title: "Patterns/Stat Group",
  component: StatGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const LongValue: Story = {
  args: {
    ...baseMock,
    value:
      "This is a very long value to see how it wraps or truncates in the UI.",
  },
};
