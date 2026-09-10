import type { Meta, StoryObj } from "@storybook/react";
import { NavItem } from "./nav-item";
import { baseMock } from "./nav-item.mock";

const meta = {
  title: "Patterns/Nav Item",
  component: NavItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavItem>;

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
    isActive: true,
  },
};
