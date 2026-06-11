import type { Meta, StoryObj } from "@storybook/react";
import { IconCluster } from "./icon-cluster";
import { baseMock } from "./icon-cluster.mock";

const meta = {
  title: "Patterns/IconCluster",
  component: IconCluster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconCluster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
