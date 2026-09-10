import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

export type StatsProps = HTMLAttributes<HTMLDivElement>;
export type StatProps = HTMLAttributes<HTMLDivElement>;
export type StatFigureProps = HTMLAttributes<HTMLDivElement>;
export type StatTitleProps = HTMLAttributes<HTMLDivElement>;
export type StatDescriptionProps = HTMLAttributes<HTMLDivElement>;

const Stats = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn("stats w-full bg-base-300 shadow", className)}
        ref={ref}
        {...props}
      />
    )
  )
);
Stats.displayName = "Stats";

const Stat = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("stat p-4", className)} ref={ref} {...props} />
    )
  )
);
Stat.displayName = "Stat";

const StatFigure = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("stat-figure", className)} ref={ref} {...props} />
    )
  )
);
StatFigure.displayName = "StatFigure";

const StatTitle = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("stat-title", className)} ref={ref} {...props} />
    )
  )
);
StatTitle.displayName = "StatTitle";

const StatDescription = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn(
          "stat-value font-normal text-lg md:font-semibold lg:text-xl xl:text-2xl",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  )
);
StatDescription.displayName = "StatDescription";

export { Stat, StatDescription, StatFigure, Stats, StatTitle };
