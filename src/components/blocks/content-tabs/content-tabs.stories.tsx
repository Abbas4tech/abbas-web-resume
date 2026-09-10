import type { Meta, StoryObj } from "@storybook/react";
import { ContentTabs } from "./content-tabs";
import { baseMock } from "./content-tabs.mock";

const meta = {
  title: "Blocks/Content Tabs",
  component: ContentTabs,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ContentTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const TwoTabs: Story = {
  args: {
    ...baseMock,
    tabs: baseMock.tabs.slice(0, 2),
  },
};
