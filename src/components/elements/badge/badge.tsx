import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "outline";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const Badge = memo(
  forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant, ...props }, ref) => (
      <span
        className={cn(
          "badge",
          variant === "primary" && "badge-primary",
          variant === "secondary" && "badge-secondary",
          variant === "accent" && "badge-accent",
          variant === "ghost" && "badge-ghost",
          variant === "outline" && "badge-outline",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  )
);
Badge.displayName = "Badge";

export { Badge };
