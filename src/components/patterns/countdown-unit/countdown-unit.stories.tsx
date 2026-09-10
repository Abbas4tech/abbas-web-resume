import type { Meta, StoryObj } from "@storybook/react";
import { CountdownUnit } from "./countdown-unit";
import { baseMock } from "./countdown-unit.mock";

const meta = {
  title: "Patterns/Countdown Unit",
  component: CountdownUnit,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CountdownUnit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Row: Story = {
  args: {
    ...baseMock,
  },
  render: () => (
    <div className="flex gap-4">
      <CountdownUnit label="Days" value={15} />
      <CountdownUnit label="Hours" value={8} />
      <CountdownUnit label="Minutes" value={42} />
    </div>
  ),
};
