import type { Meta, StoryObj } from "@storybook/react";
import { TechBadgeCloud } from "./tech-badge-cloud";
import { baseMock } from "./tech-badge-cloud.mock";

const meta = {
  title: "Patterns/Tech Badge Cloud",
  component: TechBadgeCloud,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TechBadgeCloud>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const WithoutIcons: Story = {
  args: {
    items: baseMock.items.map(({ label }) => ({ label })),
  },
};
