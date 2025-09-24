import { cn } from "@/lib/utils";
import React, { forwardRef, HTMLAttributes, memo } from "react";

const Stats = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn("w-full shadow stats bg-base-300", className)}
        {...props}
      />
    )
  )
);

const Stat = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("p-2 md:p-4 stat", className)} {...props} />
    )
  )
);

const StatFigure = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("stat-figure", className)} {...props} />
    )
  )
);

const StatTitle = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("stat-title", className)} {...props} />
    )
  )
);

const StatDescription = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          "text-lg font-normal md:font-semibold lg:text-xl xl:text-2xl stat-value",
          className
        )}
        {...props}
      />
    )
  )
);

export { Stats, Stat, StatTitle, StatDescription, StatFigure };
