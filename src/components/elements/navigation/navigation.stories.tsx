import type { Meta, StoryObj } from "@storybook/react";
import { NavigationAnimation } from "./index";
import { baseMock } from "./navigation.mock";

const meta = {
  title: "Elements/NavigationAnimation",
  component: NavigationAnimation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
