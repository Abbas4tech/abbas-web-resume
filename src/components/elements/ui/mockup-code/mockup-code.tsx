import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

export type MockupCodeProps = HTMLAttributes<HTMLDivElement>;
export type MockupCodeLineProps = HTMLAttributes<HTMLPreElement> & {
  prefix?: string;
};

/** DaisyUI mockup-code wrapper */
const MockupCode = memo(
  forwardRef<HTMLDivElement, MockupCodeProps>(
    ({ className, ...props }, ref) => (
      <div className={cn("mockup-code", className)} {...props} ref={ref} />
    )
  )
);
MockupCode.displayName = "MockupCode";

const MockupCodeLine = memo(
  forwardRef<HTMLPreElement, MockupCodeLineProps>(
    ({ className, prefix, children, ...props }, ref) => (
      <pre className={cn(className)} data-prefix={prefix} ref={ref} {...props}>
        <code>{children}</code>
      </pre>
    )
  )
);
MockupCodeLine.displayName = "MockupCodeLine";

export { MockupCode, MockupCodeLine };
