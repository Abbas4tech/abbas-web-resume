import type { Meta, StoryObj } from "@storybook/react";
import { ProcessSteps } from "./process-steps";
import { baseMock } from "./process-steps.mock";

const meta = {
  title: "Blocks/ProcessSteps",
  component: ProcessSteps,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProcessSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const WithoutIcons: Story = {
  args: {
    steps: baseMock.steps.map(({ title, description }) => ({
      title,
      description,
    })),
  },
};
