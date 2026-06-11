import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "./menu";
import { baseMock } from "./menu.mock";

const meta = {
  title: "Elements/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
