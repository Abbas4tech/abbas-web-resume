import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";
import { baseMock } from "./skeleton.mock";

const meta = {
  title: "Elements/UI/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Circular: Story = {
  args: {
    ...baseMock,
    className: "h-16 w-16 shrink-0 rounded-full",
  },
};
