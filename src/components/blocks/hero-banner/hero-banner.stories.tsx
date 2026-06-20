import type { Meta, StoryObj } from "@storybook/react";
import { HeroBanner } from "./hero-banner";
import { baseMock } from "./hero-banner.mock";

const meta = {
  title: "Blocks/HeroBanner",
  component: HeroBanner,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const NoAnimation: Story = {
  args: {
    ...baseMock,
    animation: undefined,
  },
};

export const NoIconLinks: Story = {
  args: {
    ...baseMock,
    iconLinks: [],
  },
};
