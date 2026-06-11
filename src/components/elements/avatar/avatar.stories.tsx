import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./avatar";
import { baseMock } from "./avatar.mock";

const meta = {
  title: "Elements/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const LargeWithRing: Story = {
  args: {
    ...baseMock,
    size: "lg",
    ring: "ring-primary ring-offset-base-100 ring-offset-2",
  },
};
