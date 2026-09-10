import type { Meta, StoryObj } from "@storybook/react";
import { MockupWindow } from "./mockup-window";
import { baseMock } from "./mockup-window.mock";

const meta = {
  title: "Elements/UI/Mockup Window",
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
