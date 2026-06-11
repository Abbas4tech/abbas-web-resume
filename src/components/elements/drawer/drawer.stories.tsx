import type { Meta, StoryObj } from "@storybook/react";
import { DrawerProvider } from "./drawer";
import { baseMock } from "./drawer.mock";

const meta = {
  title: "Elements/Drawer",
  component: DrawerProvider,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DrawerProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
