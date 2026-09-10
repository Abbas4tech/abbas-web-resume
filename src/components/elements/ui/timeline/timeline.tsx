import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

export type TimelineProps = HTMLAttributes<HTMLUListElement> & {
  direction?: "horizontal" | "vertical";
};
export type TimelineItemProps = HTMLAttributes<HTMLLIElement>;
export type TimelineStartProps = HTMLAttributes<HTMLDivElement>;
export type TimelineMiddleProps = HTMLAttributes<HTMLDivElement>;
export type TimelineEndProps = HTMLAttributes<HTMLDivElement>;

/** DaisyUI timeline wrapper */
const Timeline = memo(
  forwardRef<HTMLUListElement, TimelineProps>(
    ({ className, direction = "vertical", ...props }, ref) => (
      <ul
        className={cn("timeline", `timeline-${direction}`, className)}
        ref={ref}
        {...props}
      />
    )
  )
);
Timeline.displayName = "Timeline";

const TimelineItem = memo(
  forwardRef<HTMLLIElement, TimelineItemProps>((props, ref) => (
    <li ref={ref} {...props} />
  ))
);
TimelineItem.displayName = "TimelineItem";

const TimelineStart = memo(
  forwardRef<HTMLDivElement, TimelineStartProps>(
    ({ className, ...props }, ref) => (
      <div className={cn("timeline-start", className)} ref={ref} {...props} />
    )
  )
);
TimelineStart.displayName = "TimelineStart";

const TimelineMiddle = memo(
  forwardRef<HTMLDivElement, TimelineMiddleProps>(
    ({ className, ...props }, ref) => (
      <div className={cn("timeline-middle", className)} ref={ref} {...props} />
    )
  )
);
TimelineMiddle.displayName = "TimelineMiddle";

const TimelineEnd = memo(
  forwardRef<HTMLDivElement, TimelineEndProps>(
    ({ className, ...props }, ref) => (
      <div className={cn("timeline-end", className)} ref={ref} {...props} />
    )
  )
);
TimelineEnd.displayName = "TimelineEnd";

export { Timeline, TimelineEnd, TimelineItem, TimelineMiddle, TimelineStart };
