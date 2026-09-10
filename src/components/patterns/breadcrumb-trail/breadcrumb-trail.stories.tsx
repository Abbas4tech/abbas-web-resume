import type { Meta, StoryObj } from "@storybook/react";
import { BreadcrumbTrail } from "./breadcrumb-trail";
import { baseMock } from "./breadcrumb-trail.mock";

const meta = {
  title: "Patterns/Breadcrumb Trail",
  component: BreadcrumbTrail,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BreadcrumbTrail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const TwoLevels: Story = {
  args: {
    items: baseMock.items.slice(0, 2),
  },
};
