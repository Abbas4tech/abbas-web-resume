import type { Meta, StoryObj } from "@storybook/react";
import { Stats } from "./stat";
import { baseMock } from "./stat.mock";

const meta = {
  title: "Elements/Stat",
  component: Stats,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Stats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
