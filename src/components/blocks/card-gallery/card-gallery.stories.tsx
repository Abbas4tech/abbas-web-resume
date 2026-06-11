import type { Meta, StoryObj } from "@storybook/react";
import { CardGallery } from "./card-gallery";
import { baseMock } from "./card-gallery.mock";

const meta = {
  title: "Blocks/CardGallery",
  component: CardGallery,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CardGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const SingleCard: Story = {
  args: {
    ...baseMock,
    cards: [baseMock.cards[0]],
  },
};

export const ManyCards: Story = {
  args: {
    ...baseMock,
    cards: [...baseMock.cards, ...baseMock.cards, ...baseMock.cards],
  },
};
