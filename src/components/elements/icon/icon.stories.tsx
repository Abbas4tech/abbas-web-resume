import type { Meta, StoryObj } from "@storybook/react";
import { baseMock } from "./icon.mock";
import { Icon } from "./index";

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
