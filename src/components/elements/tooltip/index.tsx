import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";
import type { TooltipProps } from "./types";

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
