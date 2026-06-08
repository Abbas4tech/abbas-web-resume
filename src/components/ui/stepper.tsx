import { forwardRef, type HTMLAttributes, memo } from "react";

import { cn } from "@/lib/utils";

const Step = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn("relative flex items-center", className)}
        ref={ref}
        {...props}
      />
    )
  )
);

const StepSeparator = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn(
          "absolute left-0 z-10 h-full border-gray-600 border-r-2",
          className
        )}
        ref={ref}
        role="separator"
        {...props}
      />
    )
  )
);

const StepIndicator = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn(
          "absolute -ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-base-300 md:-ml-6 md:h-12 md:w-12",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  )
);

const StepBody = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn("mb-4 ml-8 md:ml-10", className)}
        ref={ref}
        {...props}
      />
    )
  )
);

const StepTitle = memo(
  forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h3
        className={cn(
          "font-extrabold text-xl sm:text-2xl md:text-3xl",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  )
);

const StepDescription = memo(
  forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
      <h3
        className={cn("mt-2 mb-6 gap-2 text-base-content", className)}
        ref={ref}
        {...props}
      />
    )
  )
);

const StepContent = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("", className)} ref={ref} {...props} />
    )
  )
);

export {
  Step,
  StepBody,
  StepContent,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepTitle,
};
