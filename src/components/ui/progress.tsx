import React from "react";

import { cn } from "@/lib/utils";

type ProgressProps = React.HTMLAttributes<HTMLDivElement> & {
  count: number;
};

const Progress = React.memo(
  React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ count, className, ...props }, ref) => (
      <div
        role="progressbar"
        className={cn("relative w-full h-1 bg-gray-600 rounded-2xl", className)}
        ref={ref}
        {...props}
      >
        <div
          className="absolute top-0 left-0 bg-warning rounded-2xl h-full"
          style={{ width: `${count}%` }}
        >
          <span className="absolute px-1 py-1 mb-2 text-xs text-white rounded-sm bg-slate-900 -right-4 bottom-full animate-pulse">
            {count}%
          </span>
        </div>
      </div>
    )
  )
);

export default Progress;
