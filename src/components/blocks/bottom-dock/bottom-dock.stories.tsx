import type { Meta, StoryObj } from "@storybook/react";
import { baseMock } from "./bottom-dock.mock";
import { BottomDock } from "./index";

const meta = {
  title: "Blocks/BottomDock",
  component: BottomDock,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BottomDock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const ManyItems: Story = {
  args: {
    ...baseMock,
    items: [
      ...baseMock.items,
      {
        title: "Blog",
        pageUrl: "/blog",
        pageIcon: { iconCode: "md/MdArticle", name: "Blog" },
      },
      {
        title: "Resume",
        pageUrl: "/resume",
        pageIcon: { iconCode: "md/MdPictureAsPdf", name: "Resume" },
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    ...baseMock,
    items: [baseMock.items[0]],
  },
};
