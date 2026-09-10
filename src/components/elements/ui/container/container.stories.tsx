import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./container";
import { baseMock } from "./container.mock";

const meta = {
  title: "Elements/UI/Container",
  component: Container,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
