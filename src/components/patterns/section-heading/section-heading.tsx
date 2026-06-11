import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps
  extends HTMLAttributes<HTMLHeadingElement> {
  /** Optional leading icon (pass a rendered <Icon /> from the element layer) */
  icon?: ReactNode;
}

/**
 * Visual heading with optional leading icon.
 * Used across all pages as the section title (h2).
 */
const SectionHeading = memo(
  forwardRef<HTMLHeadingElement, SectionHeadingProps>(
    ({ className, icon, children, ...props }, ref) => (
      <h2
        className={cn(
          "mb-4 flex items-center gap-4 font-bold text-xl md:text-3xl",
          className
        )}
        ref={ref}
        {...props}
      >
        {icon}
        {children}
      </h2>
    )
  )
);
SectionHeading.displayName = "SectionHeading";

export { SectionHeading };
