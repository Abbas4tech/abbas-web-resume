import type { Meta, StoryObj } from "@storybook/react";
import { PageWrapper } from "./index";
import { baseMock } from "./page-wrapper.mock";

const meta = {
  title: "Blocks/PageWrapper",
  component: PageWrapper,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const ManyPages: Story = {
  args: {
    ...baseMock,
    pages: [
      ...baseMock.pages,
      { title: "Blog", pageUrl: "/blog" },
      { title: "Contact", pageUrl: "/contact" },
      { title: "Resume", pageUrl: "/resume" },
    ],
  },
};
