import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./accordion";
import { baseMock } from "./accordion.mock";

const meta = {
  title: "Elements/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
