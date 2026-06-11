import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

export type MockupWindowProps = HTMLAttributes<HTMLDivElement>;
export type MockupWindowBodyProps = HTMLAttributes<HTMLDivElement>;

/** DaisyUI mockup-window wrapper */
const MockupWindow = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn(
          "mockup-window border border-neutral bg-base-300",
          className
        )}
        {...props}
        ref={ref}
      />
    )
  )
);
MockupWindow.displayName = "MockupWindow";

const MockupWindowBody = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("bg-base-200 p-4", className)} {...props} ref={ref} />
    )
  )
);
MockupWindowBody.displayName = "MockupWindowBody";

export { MockupWindow, MockupWindowBody };
