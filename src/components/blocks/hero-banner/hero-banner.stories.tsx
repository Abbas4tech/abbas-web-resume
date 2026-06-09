import type { Meta, StoryObj } from "@storybook/react";
import { baseMock } from "./hero-banner.mock";
import { HeroBanner } from "./index";

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

export const NoSocialLinks: Story = {
  args: {
    ...baseMock,
    socialLinks: [],
  },
};
