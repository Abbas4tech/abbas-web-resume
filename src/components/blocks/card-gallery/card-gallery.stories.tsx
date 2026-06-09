import type { Meta, StoryObj } from "@storybook/react";
import { baseMock } from "./card-gallery.mock";
import { CardGallery } from "./index";

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
