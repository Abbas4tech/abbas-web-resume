import type { Meta, StoryObj } from "@storybook/react";
import { Step } from "./step";
import { baseMock } from "./step.mock";

const meta = {
  title: "Elements/UI/Step",
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
    // A plain div, not <ul>: Step renders a <div> (see timeline-entry.tsx, its
    // real consumer, which mounts it directly with no list wrapper at all) —
    // wrapping bare <Step> divs in <ul> here would claim list/listitem
    // semantics the markup doesn't have.
    <div className="steps">
      <Step {...args} />
      <Step>Step 2</Step>
    </div>
  ),
};
