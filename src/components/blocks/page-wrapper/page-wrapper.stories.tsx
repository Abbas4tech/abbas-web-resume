import type { Meta, StoryObj } from "@storybook/react";
import { PageWrapper } from "./page-wrapper";
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

export const SinglePage: Story = {
  args: {
    ...baseMock,
    pages: [baseMock.pages[0]],
  },
};
