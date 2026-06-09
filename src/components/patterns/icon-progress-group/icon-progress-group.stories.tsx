import type { Meta, StoryObj } from "@storybook/react";
import { baseMock } from "./icon-progress-group.mock";
import { IconProgressGroup } from "./index";

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
