import type { Meta, StoryObj } from "@storybook/react";
import { MotionWrapper } from "./motion-wrapper";

const meta = {
  title: "Elements/Behavior/Motion Wrapper",
  component: MotionWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    animation: {
      control: "select",
      options: ["fade-up", "fade-in", "slide-left", "slide-right", "zoom-in"],
    },
    delay: {
      control: { type: "number", min: 0, max: 2, step: 0.1 },
    },
    as: {
      control: "select",
      options: ["div", "span", "section", "li", "ul"],
    },
  },
} satisfies Meta<typeof MotionWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    animation: "fade-up",
    children: (
      <div className="rounded-xl bg-primary p-8 text-primary-content shadow-lg">
        <h2 className="mb-2 font-bold text-2xl">Animated Content</h2>
        <p>This content fades up when scrolled into view.</p>
      </div>
    ),
  },
};

export const SlideLeft: Story = {
  args: {
    animation: "slide-left",
    children: (
      <div className="rounded-xl bg-secondary p-8 text-secondary-content shadow-lg">
        <h2 className="mb-2 font-bold text-2xl">Slide Left</h2>
        <p>This content slides in from the right.</p>
      </div>
    ),
  },
};
