import { cn } from "@lib/utils";
import React from "react";

const Button = React.memo(
  React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
    ({ className, ...props }, ref) => {
      return (
        <button
          ref={ref}
          className={cn(
            "btn-sm btn md:btn-md text-sm md:text-base capitalize text-base-content bg-base-300 inline-flex gap-2",
            className
          )}
          {...props}
        />
      );
    }
  )
);
Button.displayName = "Button";

export default Button;
