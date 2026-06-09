import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

const Kbd = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
    ({ className, ...props }, ref) => (
      <kbd className={cn("kbd", className)} ref={ref} {...props} />
    )
  )
);
Kbd.displayName = "Kbd";

export { Kbd };
