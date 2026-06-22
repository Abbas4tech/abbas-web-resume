import type { Meta, StoryObj } from "@storybook/react";
import { MotionWrapper } from "@/components/elements/behavior/motion-wrapper/motion-wrapper";
import { Progress } from "./progress";
import { baseMock } from "./progress.mock";

const meta = {
  title: "Elements/UI/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MotionWrapper animation="fade-in">
        <Story />
      </MotionWrapper>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Full: Story = {
  args: {
    ...baseMock,
    count: 100,
    className: "progress-success w-56",
  },
};

export const Empty: Story = {
  args: {
    ...baseMock,
    count: 0,
    className: "progress-error w-56",
  },
};
