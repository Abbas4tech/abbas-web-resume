import type { Meta, StoryObj } from "@storybook/react";
import { SocialLink } from "./social-link";
import { baseMock } from "./social-link.mock";

const meta = {
  title: "Patterns/SocialLink",
  component: SocialLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SocialLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
