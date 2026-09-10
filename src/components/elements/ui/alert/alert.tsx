import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export type AlertVariant = "info" | "success" | "warning" | "error";
export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
};

import { forwardRef, memo } from "react";

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
