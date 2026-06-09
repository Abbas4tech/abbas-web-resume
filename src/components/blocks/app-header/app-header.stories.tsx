import type { Meta, StoryObj } from "@storybook/react";
import { baseMock } from "./app-header.mock";
import { AppHeader } from "./index";

const meta = {
  title: "Blocks/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const LongTitle: Story = {
  args: {
    ...baseMock,
    title: "Abbas Portfolio - Senior Full Stack Engineer",
  },
};

export const LimitedThemes: Story = {
  args: {
    ...baseMock,
    themes: ["light", "dark"],
  },
};
