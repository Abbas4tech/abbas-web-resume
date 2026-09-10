import type { Meta, StoryObj } from "@storybook/react";
import { StatusIndicator } from "./status-indicator";
import { baseMock } from "./status-indicator.mock";

const meta = {
  title: "Patterns/Status Indicator",
  component: StatusIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const NotAvailable: Story = {
  args: {
    color: "error",
    label: "Not looking right now",
  },
};
