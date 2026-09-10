import type { Meta, StoryObj } from "@storybook/react";
import { TestimonialWall } from "./testimonial-wall";
import { baseMock } from "./testimonial-wall.mock";

const meta = {
  title: "Blocks/Testimonial Wall",
  component: TestimonialWall,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TestimonialWall>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const SingleTestimonial: Story = {
  args: {
    ...baseMock,
    testimonials: [baseMock.testimonials[0]],
  },
};
