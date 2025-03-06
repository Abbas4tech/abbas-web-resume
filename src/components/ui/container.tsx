import { cn } from "@lib/utils";
import React from "react";

const Container = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          "container mx-auto scrollbar-hide overflow-hidden md:text-lg text-sm"
        )}
        {...props}
      />
    )
  )
);

export default Container;
