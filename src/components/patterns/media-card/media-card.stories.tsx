import type { Meta, StoryObj } from "@storybook/react";
import { MediaCard } from "./media-card";
import { baseMock } from "./media-card.mock";

const meta = {
  title: "Patterns/MediaCard",
  component: MediaCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const LongDescription: Story = {
  args: {
    ...baseMock,
    description:
      "This is a significantly longer description designed to test how the card handles multi-line text wrapping. It should gracefully truncate or expand the card height depending on the CSS configuration.",
  },
};
