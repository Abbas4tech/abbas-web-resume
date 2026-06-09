import type { Meta, StoryObj } from "@storybook/react";
import { Swap } from "./index";
import { baseMock } from "./swap.mock";

const meta = {
  title: "Elements/Swap",
  component: Swap,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Swap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Active: Story = {
  args: {
    ...baseMock,
    active: true,
  },
};
