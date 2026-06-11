import type { Meta, StoryObj } from "@storybook/react";
import { IconProgressGroup } from "./icon-progress-group";
import { baseMock } from "./icon-progress-group.mock";

const meta = {
  title: "Patterns/IconProgressGroup",
  component: IconProgressGroup,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconProgressGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
