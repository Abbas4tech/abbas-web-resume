import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeading } from "./index";
import { baseMock } from "./section-heading.mock";

const meta = {
  title: "Patterns/SectionHeading",
  component: SectionHeading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const WithoutIcon: Story = {
  args: {
    ...baseMock,
    icon: undefined,
  },
};
