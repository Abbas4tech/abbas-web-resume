import type { Meta, StoryObj } from "@storybook/react";
import { baseMock } from "./accordion.mock";
import { Accordion } from "./index";

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
