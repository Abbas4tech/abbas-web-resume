import type { Meta, StoryObj } from "@storybook/react";
import { FaqAccordion } from "./faq-accordion";
import { baseMock } from "./faq-accordion.mock";

const meta = {
  title: "Blocks/FAQ Accordion",
  component: FaqAccordion,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FaqAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const SingleQuestion: Story = {
  args: {
    ...baseMock,
    items: [baseMock.items[0]],
  },
};
