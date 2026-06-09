import type { Meta, StoryObj } from "@storybook/react";
import { baseMock } from "./dropdown.mock";
import { Dropdown } from "./index";

const meta = {
  title: "Elements/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
  render: (args) => (
    <div className="flex h-48 items-start justify-center pt-8">
      <Dropdown {...args} />
    </div>
  ),
};
