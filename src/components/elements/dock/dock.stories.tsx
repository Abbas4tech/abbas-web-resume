import type { Meta, StoryObj } from "@storybook/react";
import { Dock } from "./dock";
import { baseMock } from "./dock.mock";

const meta = {
  title: "Elements/Dock",
  component: Dock,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
  render: (args) => (
    <div className="relative h-64 w-full overflow-hidden rounded-xl bg-base-200">
      <Dock {...args} className="absolute bottom-4 left-1/2 -translate-x-1/2" />
    </div>
  ),
};
