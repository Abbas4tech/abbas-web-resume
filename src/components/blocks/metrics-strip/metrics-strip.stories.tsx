import type { Meta, StoryObj } from "@storybook/react";
import { MetricsStrip } from "./metrics-strip";
import { baseMock } from "./metrics-strip.mock";

const meta = {
  title: "Blocks/MetricsStrip",
  component: MetricsStrip,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MetricsStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const TwoStats: Story = {
  args: {
    ...baseMock,
    stats: baseMock.stats.slice(0, 2),
  },
};
