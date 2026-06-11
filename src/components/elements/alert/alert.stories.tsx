import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./alert";
import { baseMock } from "./alert.mock";

const meta = {
  title: "Elements/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Success: Story = {
  args: {
    ...baseMock,
    variant: "success",
    children: "Operation completed successfully!",
  },
};

export const Warning: Story = {
  args: {
    ...baseMock,
    variant: "warning",
    children: "Warning: Low disk space.",
  },
};

export const ErrorAlert: Story = {
  args: {
    ...baseMock,
    variant: "error",
    children: "Error: Failed to save data.",
  },
};
