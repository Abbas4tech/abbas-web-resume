import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

const Container = memo(
  forwardRef<HTMLDivElement, ContainerProps>(({ className, ...props }, ref) => (
    <div
      className={cn(
        "scrollbar-hide container mx-auto overflow-hidden text-sm group-data-[variant='default']:min-w-screen md:text-lg",
        className
      )}
      ref={ref}
      {...props}
    />
  ))
);
Container.displayName = "Container";

export { Container };
