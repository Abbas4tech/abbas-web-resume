import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

export type IconClusterProps = HTMLAttributes<HTMLDivElement>;

/** Flex row of icon-sized elements — wraps SkillList visuals */
const IconCluster = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn("flex min-w-0 flex-wrap gap-2", className)}
        ref={ref}
        {...props}
      />
    )
  )
);
IconCluster.displayName = "IconCluster";

export { IconCluster };
