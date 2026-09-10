import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

export type StatusColor =
  | "neutral"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";
export type StatusSize = "xs" | "sm" | "md" | "lg" | "xl";

export type StatusProps = HTMLAttributes<HTMLSpanElement> & {
  color?: StatusColor;
  size?: StatusSize;
};

/** DaisyUI status wrapper — a small dot indicating an element's current state (online/offline/etc). */
const Status = memo(
  forwardRef<HTMLSpanElement, StatusProps>(
    ({ className, color, size, "aria-label": ariaLabel, ...props }, ref) => (
      <span
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
        className={cn(
          "status",
          color && `status-${color}`,
          size && `status-${size}`,
          className
        )}
        ref={ref}
        role="img"
        {...props}
      />
    )
  )
);
Status.displayName = "Status";

export { Status };
