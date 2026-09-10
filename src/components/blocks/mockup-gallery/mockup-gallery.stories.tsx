import type { Meta, StoryObj } from "@storybook/react";
import { MockupGallery } from "./mockup-gallery";
import { baseMock, phoneMock } from "./mockup-gallery.mock";

const meta = {
  title: "Blocks/Mockup Gallery",
  component: MockupGallery,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MockupGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Browser: Story = {
  args: {
    ...baseMock,
  },
};

export const Phone: Story = {
  args: {
    ...phoneMock,
  },
};
