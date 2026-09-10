import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { ChatMessageRow } from "./chat-message-row";

describe("ChatMessageRow", () => {
  it("renders author, message, and meta", () => {
    render(
      <ChatMessageRow
        author="Ada Sparkline"
        message="A great quote."
        meta="Staff Engineer"
      />
    );

    expect(screen.getByText("Ada Sparkline")).toBeInTheDocument();
    expect(screen.getByText("A great quote.")).toBeInTheDocument();
    expect(screen.getByText("Staff Engineer")).toBeInTheDocument();
  });

  it("omits the footer when no meta is given", () => {
    render(<ChatMessageRow author="Ada Sparkline" message="A quote." />);
    expect(screen.queryByText("Staff Engineer")).not.toBeInTheDocument();
  });

  it("renders an avatar image when avatarSrc is provided", () => {
    render(
      <ChatMessageRow
        author="Ada Sparkline"
        avatarAlt="Ada avatar"
        avatarSrc="/fixtures/avatar.png"
        message="A quote."
      />
    );

    expect(screen.getByRole("img", { name: "Ada avatar" })).toBeInTheDocument();
  });
});
