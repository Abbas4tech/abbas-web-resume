import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./index";
import { baseMock } from "./modal.mock";

const meta = {
  title: "Elements/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
