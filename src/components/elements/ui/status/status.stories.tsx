import type { Meta, StoryObj } from "@storybook/react";
import { Status } from "./status";
import { baseMock } from "./status.mock";

const meta = {
  title: "Elements/UI/Status",
  component: Status,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Offline: Story = {
  args: {
    color: "error",
    "aria-label": "Offline",
  },
};

export const Large: Story = {
  args: {
    ...baseMock,
    size: "lg",
  },
};
