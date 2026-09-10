import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

export type MockupBrowserProps = HTMLAttributes<HTMLDivElement>;
export type MockupBrowserToolbarProps = HTMLAttributes<HTMLDivElement> & {
  url?: string;
};

/** DaisyUI mockup-browser wrapper */
const MockupBrowser = memo(
  forwardRef<HTMLDivElement, MockupBrowserProps>(
    ({ className, ...props }, ref) => (
      <div
        className={cn(
          "mockup-browser border border-neutral bg-base-300",
          className
        )}
        {...props}
        ref={ref}
      />
    )
  )
);
MockupBrowser.displayName = "MockupBrowser";

const MockupBrowserToolbar = memo(
  forwardRef<HTMLDivElement, MockupBrowserToolbarProps>(
    ({ className, url, children, ...props }, ref) => (
      <div
        className={cn("mockup-browser-toolbar", className)}
        {...props}
        ref={ref}
      >
        {url ? <div className="input">{url}</div> : children}
      </div>
    )
  )
);
MockupBrowserToolbar.displayName = "MockupBrowserToolbar";

export { MockupBrowser, MockupBrowserToolbar };
