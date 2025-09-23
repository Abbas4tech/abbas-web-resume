import { cn } from "@/lib/utils";
import React from "react";

const Step = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn("relative flex items-center", className)}
        {...props}
      />
    )
  )
);

const StepSeparator = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        role="separator"
        className={cn(
          "absolute z-10 h-full border-r-2 border-gray-600 left-0",
          className
        )}
        {...props}
      />
    )
  )
);

const StepIndicator = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          "absolute flex items-center justify-center w-8 h-8 -ml-4 rounded-full md:-ml-6 md:w-12 md:h-12 bg-base-300",
          className
        )}
        {...props}
      />
    )
  )
);

const StepBody = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn("mb-4 ml-8 md:ml-10", className)}
        {...props}
      />
    )
  )
);

const StepTitle = React.memo(
  React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
  >(({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-extrabold sm:text-2xl md:text-3xl",
        className
      )}
      {...props}
    />
  ))
);

const StepDescription = React.memo(
  React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
  >(({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("gap-2 mb-6 text-base-content mt-2", className)}
      {...props}
    />
  ))
);

const StepContent = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("", className)} {...props} />
    )
  )
);

export {
  Step,
  StepBody,
  StepContent,
  StepSeparator,
  StepIndicator,
  StepDescription,
  StepTitle,
};
