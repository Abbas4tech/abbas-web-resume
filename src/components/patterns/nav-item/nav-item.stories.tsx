import type { Meta, StoryObj } from "@storybook/react";
import { NavItem } from "./index";
import { baseMock } from "./nav-item.mock";

const meta = {
  title: "Patterns/NavItem",
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
