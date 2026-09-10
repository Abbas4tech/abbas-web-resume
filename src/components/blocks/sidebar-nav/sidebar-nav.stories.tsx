import type { Meta, StoryObj } from "@storybook/react";
import { SidebarNav } from "./sidebar-nav";
import { baseMock } from "./sidebar-nav.mock";

const meta = {
  title: "Blocks/Sidebar Nav",
  component: SidebarNav,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const SingleItem: Story = {
  args: {
    ...baseMock,
    pages: [baseMock.pages[0]],
  },
};
