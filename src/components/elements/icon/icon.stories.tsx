import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./icon";
import { baseMock } from "./icon.mock";

const meta = {
  title: "Elements/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
