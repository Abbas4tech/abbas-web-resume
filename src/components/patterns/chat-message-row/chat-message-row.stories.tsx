import type { Meta, StoryObj } from "@storybook/react";
import { ChatMessageRow } from "./chat-message-row";
import { baseMock } from "./chat-message-row.mock";

const meta = {
  title: "Patterns/Chat Message Row",
  component: ChatMessageRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChatMessageRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const WithAvatar: Story = {
  args: {
    ...baseMock,
    avatarSrc: "/fixtures/avatar.png",
    avatarAlt: "Ada Sparkline avatar",
  },
};

export const NoMeta: Story = {
  args: {
    ...baseMock,
    meta: undefined,
  },
};
