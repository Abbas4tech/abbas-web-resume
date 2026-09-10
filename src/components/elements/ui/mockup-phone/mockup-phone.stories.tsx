import type { Meta, StoryObj } from "@storybook/react";
import { MockupPhone } from "./mockup-phone";
import { baseMock } from "./mockup-phone.mock";

const meta = {
  title: "Elements/UI/Mockup Phone",
  component: MockupPhone,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MockupPhone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
