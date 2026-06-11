import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { baseMock } from "./badge.mock";

const meta = {
  title: "Elements/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Secondary: Story = {
  args: {
    ...baseMock,
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    ...baseMock,
    variant: "outline",
  },
};
