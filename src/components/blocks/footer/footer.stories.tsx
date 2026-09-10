import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./footer";
import { baseMock } from "./footer.mock";

const meta = {
  title: "Blocks/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const NoEmail: Story = {
  args: {
    ...baseMock,
    email: undefined,
  },
};

export const NoLinks: Story = {
  args: {
    ...baseMock,
    links: [],
  },
};
