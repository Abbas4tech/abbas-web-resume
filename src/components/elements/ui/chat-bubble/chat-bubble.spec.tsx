import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import {
  ChatBubble,
  ChatBubbleFooter,
  ChatBubbleHeader,
  ChatBubbleMessage,
} from "./chat-bubble";

describe("ChatBubble", () => {
  it("renders a start-placement bubble with header, message, and footer", () => {
    render(
      <ChatBubble data-testid="bubble" placement="start">
        <ChatBubbleHeader>Ada Sparkline</ChatBubbleHeader>
        <ChatBubbleMessage color="primary">A great quote.</ChatBubbleMessage>
        <ChatBubbleFooter>Engineer</ChatBubbleFooter>
      </ChatBubble>
    );

    const bubble = screen.getByTestId("bubble");
    expect(bubble).toHaveClass("chat", "chat-start");
    expect(screen.getByText("Ada Sparkline")).toBeInTheDocument();
    expect(screen.getByText("A great quote.")).toHaveClass(
      "chat-bubble",
      "chat-bubble-primary"
    );
    expect(screen.getByText("Engineer")).toBeInTheDocument();
  });

  it("defaults to chat-start when no placement is given", () => {
    render(<ChatBubble data-testid="bubble" />);
    expect(screen.getByTestId("bubble")).toHaveClass("chat-start");
  });

  it("applies chat-end placement", () => {
    render(<ChatBubble data-testid="bubble" placement="end" />);
    expect(screen.getByTestId("bubble")).toHaveClass("chat-end");
  });
});
