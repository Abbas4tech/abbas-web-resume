import type { Meta, StoryObj } from "@storybook/react";
import { IconRadialProgressRow } from "./icon-radial-progress-row";
import { baseMock } from "./icon-radial-progress-row.mock";

const meta = {
  title: "Patterns/Icon Radial Progress Row",
  component: IconRadialProgressRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconRadialProgressRow>;

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
