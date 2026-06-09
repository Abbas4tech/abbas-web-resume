import type { Meta, StoryObj } from "@storybook/react";
import { baseMock } from "./card.mock";
import { Card } from "./index";

const meta = {
  title: "Elements/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
