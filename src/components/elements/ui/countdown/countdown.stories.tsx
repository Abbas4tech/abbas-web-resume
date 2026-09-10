import type { Meta, StoryObj } from "@storybook/react";
import { Countdown } from "./countdown";
import { baseMock } from "./countdown.mock";

const meta = {
  title: "Elements/UI/Countdown",
  component: Countdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Countdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Large: Story = {
  args: {
    ...baseMock,
    className: "text-6xl",
  },
};
