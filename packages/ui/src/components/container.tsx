import React from "react";

import { cn } from "../lib/utils";

const Container = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn(
          "scrollbar-hide container mx-auto overflow-hidden text-sm group-data-[variant='default']:min-w-screen md:text-lg",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  )
);

export { Container };
