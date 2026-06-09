import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

const Skeleton = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("skeleton", className)} ref={ref} {...props} />
    )
  )
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
