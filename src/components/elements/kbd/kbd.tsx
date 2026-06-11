import { cn } from "@/lib/utils";
export type KbdProps = HTMLAttributes<HTMLElement>;

import { forwardRef, type HTMLAttributes, memo } from "react";

const Kbd = memo(
  forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
    ({ className, ...props }, ref) => (
      <kbd className={cn("kbd", className)} ref={ref} {...props} />
    )
  )
);
Kbd.displayName = "Kbd";

export { Kbd };
