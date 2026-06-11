import type { Meta, StoryObj } from "@storybook/react";
import { IconProgressRow } from "./icon-progress-row";
import { baseMock } from "./icon-progress-row.mock";

const meta = {
  title: "Patterns/IconProgressRow",
  component: IconProgressRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconProgressRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const FullProgress: Story = {
  args: {
    ...baseMock,
    progress: 100,
  },
};

export const LowProgress: Story = {
  args: {
    ...baseMock,
    progress: 25,
  },
};
