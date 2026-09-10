import type { Meta, StoryObj } from "@storybook/react";
import { MockupShowcaseFrame } from "./mockup-showcase-frame";
import { baseMock } from "./mockup-showcase-frame.mock";

const meta = {
  title: "Patterns/Mockup Showcase Frame",
  component: MockupShowcaseFrame,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MockupShowcaseFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Browser: Story = {
  args: {
    ...baseMock,
  },
};

export const Phone: Story = {
  args: {
    ...baseMock,
    variant: "phone",
  },
};

export const Window: Story = {
  args: {
    ...baseMock,
    variant: "window",
  },
};

export const Code: Story = {
  args: {
    ...baseMock,
    variant: "code",
  },
};
