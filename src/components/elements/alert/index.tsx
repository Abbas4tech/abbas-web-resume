import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";
import type { AlertProps } from "./types";

const Alert = memo(
  forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant, children, ...props }, ref) => (
      <div
        className={cn("alert", variant && `alert-${variant}`, className)}
        ref={ref}
        role="alert"
        {...props}
      >
        {children}
      </div>
    )
  )
);
Alert.displayName = "Alert";

export { Alert };
