import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./tooltip";
import { baseMock } from "./tooltip.mock";

const meta = {
  title: "Elements/UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Bottom: Story = {
  args: {
    ...baseMock,
    position: "bottom",
  },
};
