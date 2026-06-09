import { forwardRef, type HTMLAttributes, memo } from "react";

import { cn } from "@/lib/utils";

/** Simple scrollable page column. Contains no data-fetching. */
const PageContent = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("", className)} ref={ref} {...props} />
    )
  )
);
PageContent.displayName = "PageContent";

const PageHeading = memo(
  forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h1
        className={cn(
          "flex items-center justify-center gap-4 p-4 px-0 font-bold text-xl md:py-6 md:text-4xl",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  )
);
PageHeading.displayName = "PageHeading";

export { PageContent, PageHeading };
