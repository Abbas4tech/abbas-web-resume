import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  tip: string;
  position?: TooltipPosition;
};

import { forwardRef, memo } from "react";

const Tooltip = memo(
  forwardRef<HTMLDivElement, TooltipProps>(
    ({ className, tip, position, children, ...props }, ref) => (
      <div
        className={cn("tooltip", position && `tooltip-${position}`, className)}
        data-tip={tip}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  )
);
Tooltip.displayName = "Tooltip";

export { Tooltip };
