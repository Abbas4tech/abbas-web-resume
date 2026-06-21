import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./tabs";
import { baseMock } from "./tabs.mock";

const meta = {
  title: "Elements/UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Lifted: Story = {
  args: {
    ...baseMock,
    variant: "lifted",
  },
};

export const Bordered: Story = {
  args: {
    ...baseMock,
    variant: "bordered",
  },
};
