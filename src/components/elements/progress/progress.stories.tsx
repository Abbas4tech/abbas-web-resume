import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./index";
import { baseMock } from "./progress.mock";

const meta = {
  title: "Elements/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Progress>;

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
    className: "progress-success w-56",
  },
};

export const Empty: Story = {
  args: {
    ...baseMock,
    count: 0,
    className: "progress-error w-56",
  },
};
