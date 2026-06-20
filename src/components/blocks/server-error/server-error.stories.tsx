import type { Meta, StoryObj } from "@storybook/react";
import { ServerErrorBlock } from "./server-error";
import { baseMock } from "./server-error.mock";

const meta = {
  title: "Blocks/ServerError",
  component: ServerErrorBlock,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    message: { control: "text" },
    actionLabel: { control: "text" },
    onRetry: { action: "onRetry" },
  },
} satisfies Meta<typeof ServerErrorBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const WithoutRetry: Story = {
  args: {
    ...baseMock,
    onRetry: undefined,
  },
};

export const CustomMessage: Story = {
  args: {
    ...baseMock,
    title: "Service Unavailable",
    message:
      "Our servers are currently undergoing maintenance. Please check back in a few minutes.",
    actionLabel: "Refresh",
  },
};
