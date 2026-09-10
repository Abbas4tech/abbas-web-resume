import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./carousel";
import { baseMock } from "./carousel.mock";

const meta = {
  title: "Blocks/Carousel",
  component: Carousel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const SingleSlide: Story = {
  args: {
    ...baseMock,
    slides: [baseMock.slides[0]],
  },
};
