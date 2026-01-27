import { forwardRef, type HTMLAttributes, memo } from "react";

import { cn } from "../lib/utils";

const Stats = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("stats w-full bg-base-300 shadow", className)} ref={ref} {...props} />
  ))
);

const Stat = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("stat p-4", className)} ref={ref} {...props} />
  ))
);

const StatFigure = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("stat-figure", className)} ref={ref} {...props} />
  ))
);

const StatTitle = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("stat-title", className)} ref={ref} {...props} />
  ))
);

const StatDescription = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
      className={cn(
        "stat-value font-normal text-lg md:font-semibold lg:text-xl xl:text-2xl",
        className
      )}
      ref={ref}
      {...props}
    />
  ))
);

export { Stats, Stat, StatTitle, StatDescription, StatFigure };
