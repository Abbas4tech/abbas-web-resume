import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

export type ChatBubbleColor =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

export type ChatBubbleProps = HTMLAttributes<HTMLDivElement> & {
  placement?: "start" | "end";
};
export type ChatBubbleImageProps = HTMLAttributes<HTMLDivElement>;
export type ChatBubbleHeaderProps = HTMLAttributes<HTMLDivElement>;
export type ChatBubbleMessageProps = HTMLAttributes<HTMLDivElement> & {
  color?: ChatBubbleColor;
};
export type ChatBubbleFooterProps = HTMLAttributes<HTMLDivElement>;

/** DaisyUI chat wrapper */
const ChatBubble = memo(
  forwardRef<HTMLDivElement, ChatBubbleProps>(
    ({ className, placement = "start", ...props }, ref) => (
      <div
        className={cn("chat", `chat-${placement}`, className)}
        ref={ref}
        {...props}
      />
    )
  )
);
ChatBubble.displayName = "ChatBubble";

const ChatBubbleImage = memo(
  forwardRef<HTMLDivElement, ChatBubbleImageProps>(
    ({ className, ...props }, ref) => (
      <div className={cn("chat-image", className)} ref={ref} {...props} />
    )
  )
);
ChatBubbleImage.displayName = "ChatBubbleImage";

const ChatBubbleHeader = memo(
  forwardRef<HTMLDivElement, ChatBubbleHeaderProps>(
    ({ className, ...props }, ref) => (
      <div className={cn("chat-header", className)} ref={ref} {...props} />
    )
  )
);
ChatBubbleHeader.displayName = "ChatBubbleHeader";

const ChatBubbleMessage = memo(
  forwardRef<HTMLDivElement, ChatBubbleMessageProps>(
    ({ className, color, ...props }, ref) => (
      <div
        className={cn(
          "chat-bubble",
          color && `chat-bubble-${color}`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  )
);
ChatBubbleMessage.displayName = "ChatBubbleMessage";

const ChatBubbleFooter = memo(
  forwardRef<HTMLDivElement, ChatBubbleFooterProps>(
    ({ className, ...props }, ref) => (
      <div className={cn("chat-footer", className)} ref={ref} {...props} />
    )
  )
);
ChatBubbleFooter.displayName = "ChatBubbleFooter";

export {
  ChatBubble,
  ChatBubbleFooter,
  ChatBubbleHeader,
  ChatBubbleImage,
  ChatBubbleMessage,
};
