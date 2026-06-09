import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "./index";
import { baseMock } from "./kbd.mock";

const meta = {
  title: "Elements/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const KeyCombo: Story = {
  render: () => (
    <div className="flex items-center gap-1">
      <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>Del</Kbd>
    </div>
  ),
};
