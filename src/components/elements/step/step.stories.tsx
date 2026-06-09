import type { Meta, StoryObj } from "@storybook/react";
import { Step } from "./index";
import { baseMock } from "./step.mock";

const meta = {
  title: "Elements/Step",
  component: Step,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Step>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
  render: (args) => (
    <ul className="steps">
      <Step {...args} />
      <Step>Step 2</Step>
    </ul>
  ),
};
