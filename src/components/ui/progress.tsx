import { cn } from "@lib/utils";
import React from "react";

const Progress = React.memo(
  React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
      skillProgress: number;
    }
  >(({ skillProgress, className, ...props }, ref) => (
    <div
      role="progressbar"
      className={cn("relative w-full h-1 bg-gray-600 rounded-2xl", className)}
      ref={ref}
      {...props}
    >
      <div
        className="absolute top-0 left-0 bg-warning rounded-2xl h-full"
        style={{ width: `${skillProgress}%` }}
      >
        <span className="absolute px-1 py-1 mb-2 text-xs text-white rounded-sm bg-slate-900 -right-4 bottom-full animate-pulse">
          {skillProgress}%
        </span>
      </div>
    </div>
  ))
);

export default Progress;
