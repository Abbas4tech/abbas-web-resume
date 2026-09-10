import type { Meta, StoryObj } from "@storybook/react";
import { RadialProgress } from "./radial-progress";
import { baseMock } from "./radial-progress.mock";

const meta = {
  title: "Elements/UI/Radial Progress",
  component: RadialProgress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadialProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Full: Story = {
  args: {
    ...baseMock,
    count: 100,
    className: "text-success",
  },
};

export const Empty: Story = {
  args: {
    ...baseMock,
    count: 0,
    className: "text-error",
  },
};
