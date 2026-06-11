import type { Meta, StoryObj } from "@storybook/react";
import { PanelShowcase } from "./panel-showcase";
import { baseMock } from "./panel-showcase.mock";

const meta = {
  title: "Blocks/PanelShowcase",
  component: PanelShowcase,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PanelShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const SinglePanel: Story = {
  args: {
    ...baseMock,
    panels: [baseMock.panels[0]],
  },
};

export const NoAnimation: Story = {
  args: {
    ...baseMock,
    animation: undefined,
  },
};
