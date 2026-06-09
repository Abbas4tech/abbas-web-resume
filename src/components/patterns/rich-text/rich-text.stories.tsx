import type { Meta, StoryObj } from "@storybook/react";
import { RichText } from "./index";
import { baseMock } from "./rich-text.mock";

const meta = {
  title: "Patterns/RichText",
  component: RichText,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RichText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
