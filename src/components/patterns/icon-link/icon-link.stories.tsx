import type { Meta, StoryObj } from "@storybook/react";
import { IconLink } from "./icon-link";
import { baseMock } from "./icon-link.mock";

const meta = {
  title: "Patterns/Icon Link",
  component: IconLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
