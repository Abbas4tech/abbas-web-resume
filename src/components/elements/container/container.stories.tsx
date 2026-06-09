import type { Meta, StoryObj } from "@storybook/react";
import { baseMock } from "./container.mock";
import { Container } from "./index";

const meta = {
  title: "Elements/Container",
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
