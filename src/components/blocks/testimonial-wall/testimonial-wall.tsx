import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import {
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/elements/behavior/motion-stagger/motion-stagger";
import type { ChatMessageRowProps } from "@/components/patterns/chat-message-row/chat-message-row";
import { ChatMessageRow } from "@/components/patterns/chat-message-row/chat-message-row";
import { cn } from "@/lib/utils";

export interface TestimonialWallProps extends HTMLAttributes<HTMLDivElement> {
  testimonials: ChatMessageRowProps[];
}

const TestimonialWall = memo(
  forwardRef<HTMLDivElement, TestimonialWallProps>(
    ({ className, testimonials, ...props }, ref) => (
      <MotionStaggerContainer
        as="div"
        className={cn("my-2 flex flex-col gap-6", className)}
        ref={ref as React.Ref<HTMLElement>}
        {...props}
      >
        {testimonials.map((testimonial) => (
          <MotionStaggerItem key={testimonial.author}>
            <ChatMessageRow {...testimonial} />
          </MotionStaggerItem>
        ))}
      </MotionStaggerContainer>
    )
  )
);
TestimonialWall.displayName = "TestimonialWall";

export { TestimonialWall };
