import type { Meta, StoryObj } from "@storybook/react";
import {
  ChatBubble,
  ChatBubbleFooter,
  ChatBubbleHeader,
  ChatBubbleMessage,
} from "./chat-bubble";
import { baseMock } from "./chat-bubble.mock";

const meta = {
  title: "Elements/UI/Chat Bubble",
  component: ChatBubble,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ChatBubble placement="start">
      <ChatBubbleHeader>{baseMock.author}</ChatBubbleHeader>
      <ChatBubbleMessage color="primary">{baseMock.message}</ChatBubbleMessage>
      <ChatBubbleFooter>Full-Stack Engineer</ChatBubbleFooter>
    </ChatBubble>
  ),
};

export const End: Story = {
  render: () => (
    <ChatBubble placement="end">
      <ChatBubbleHeader>{baseMock.author}</ChatBubbleHeader>
      <ChatBubbleMessage color="secondary">
        {baseMock.message}
      </ChatBubbleMessage>
    </ChatBubble>
  ),
};
