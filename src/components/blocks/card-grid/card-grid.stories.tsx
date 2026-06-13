import type { Meta, StoryObj } from "@storybook/react";
import { CardGrid } from "./card-grid";
import { baseMock } from "./card-grid.mock";

const meta = {
  title: "Blocks/CardGrid",
  component: CardGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CardGrid>;

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
