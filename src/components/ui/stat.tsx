import { cn } from "@/lib/utils";
import React from "react";

const Stats = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn("w-full shadow stats bg-base-300", className)}
        {...props}
      />
    )
  )
);

const Stat = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("p-2 md:p-4 stat", className)} {...props} />
    )
  )
);

const StatFigure = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("stat-figure", className)} {...props} />
    )
  )
);

const StatTitle = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("stat-title", className)} {...props} />
    )
  )
);

const StatDescription = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
