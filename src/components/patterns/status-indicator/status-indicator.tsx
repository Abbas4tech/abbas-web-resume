import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import type { StatusColor } from "@/components/elements/ui/status/status";
import { Status } from "@/components/elements/ui/status/status";
import { cn } from "@/lib/utils";

export interface StatusIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  color?: StatusColor;
  label: string;
}

/** A colored status dot + its text label (e.g. "Open to new roles"). */
const StatusIndicator = memo(
  forwardRef<HTMLDivElement, StatusIndicatorProps>(
    ({ className, color = "success", label, ...props }, ref) => (
      <div
        className={cn("flex items-center gap-2", className)}
        ref={ref}
        {...props}
      >
        <Status aria-hidden="true" color={color} />
        <span>{label}</span>
      </div>
    )
  )
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator };
