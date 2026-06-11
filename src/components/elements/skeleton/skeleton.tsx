import { cn } from "@/lib/utils";
export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

import { forwardRef, type HTMLAttributes, memo } from "react";

const Skeleton = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("skeleton", className)} ref={ref} {...props} />
    )
  )
);
Skeleton.displayName = "Skeleton";

export { Skeleton };
