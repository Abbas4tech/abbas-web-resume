import type { Meta, StoryObj } from "@storybook/react";
import { MockupWindow } from "./index";
import { baseMock } from "./mockup-window.mock";

const meta = {
  title: "Elements/MockupWindow",
  component: MockupWindow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MockupWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
