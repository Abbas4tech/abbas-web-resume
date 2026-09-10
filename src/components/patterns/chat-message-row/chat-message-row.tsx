import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { Avatar, AvatarImage } from "@/components/elements/ui/avatar/avatar";
import {
  ChatBubble,
  ChatBubbleFooter,
  ChatBubbleHeader,
  ChatBubbleImage,
  ChatBubbleMessage,
} from "@/components/elements/ui/chat-bubble/chat-bubble";
import { cn } from "@/lib/utils";

export interface ChatMessageRowProps extends HTMLAttributes<HTMLDivElement> {
  author: string;
  avatarAlt?: string;
  avatarSrc?: string;
  message: string;
  /** e.g. a role, company, or timestamp shown under the bubble. */
  meta?: string;
}

/** A single quote/testimonial row: avatar (optional) + author + message + meta. */
const ChatMessageRow = memo(
  forwardRef<HTMLDivElement, ChatMessageRowProps>(
    (
      { className, author, avatarSrc, avatarAlt, message, meta, ...props },
      ref
    ) => (
      <ChatBubble
        className={cn(className)}
        placement="start"
        ref={ref}
        {...props}
      >
        {avatarSrc && (
          <ChatBubbleImage>
            <Avatar size="md">
              <AvatarImage
                alt={avatarAlt || author}
                height={48}
                src={avatarSrc}
                width={48}
              />
            </Avatar>
          </ChatBubbleImage>
        )}
        <ChatBubbleHeader>{author}</ChatBubbleHeader>
        <ChatBubbleMessage color="primary">{message}</ChatBubbleMessage>
        {meta && <ChatBubbleFooter>{meta}</ChatBubbleFooter>}
      </ChatBubble>
    )
  )
);
ChatMessageRow.displayName = "ChatMessageRow";

export { ChatMessageRow };
