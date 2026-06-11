import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

export type IconClusterProps = HTMLAttributes<HTMLDivElement>;

/** Flex row of icon-sized elements — wraps SkillList visuals */
const IconCluster = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn("flex gap-4 text-xl md:text-4xl", className)}
        ref={ref}
        {...props}
      />
    )
  )
);
IconCluster.displayName = "IconCluster";

export { IconCluster };
