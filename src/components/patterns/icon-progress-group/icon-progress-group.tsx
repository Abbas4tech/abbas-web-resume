import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

export type IconProgressGroupProps = HTMLAttributes<HTMLDivElement>;

/** Grid of IconProgressRow components — renamed from SkillGroup */
const IconProgressGroup = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn(
          "grid grid-cols-1 gap-8 p-2 md:grid-cols-2 md:p-4",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  )
);
IconProgressGroup.displayName = "IconProgressGroup";

export { IconProgressGroup };
