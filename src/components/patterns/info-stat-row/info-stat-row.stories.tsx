import type { Meta, StoryObj } from "@storybook/react";
import { InfoStatRow } from "./info-stat-row";
import { baseMock } from "./info-stat-row.mock";

const meta = {
  title: "Patterns/InfoStatRow",
  component: InfoStatRow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InfoStatRow>;

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
