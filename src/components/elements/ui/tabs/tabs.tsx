import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export type TabsVariant = "boxed" | "bordered" | "lifted";
export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  variant?: TabsVariant;
};
export type TabProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
};

import { forwardRef, memo } from "react";

const Tabs = memo(
  forwardRef<HTMLDivElement, TabsProps>(
    ({ className, variant, ...props }, ref) => (
      <div
        className={cn("tabs", variant && `tabs-${variant}`, className)}
        ref={ref}
        role="tablist"
        {...props}
      />
    )
  )
);
Tabs.displayName = "Tabs";
const Tab = memo(
  forwardRef<HTMLAnchorElement, TabProps>(
    ({ className, active, children, ...props }, ref) => (
      <a
        className={cn("tab", active && "tab-active", className)}
        ref={ref}
        role="tab"
        {...props}
      >
        {children}
      </a>
    )
  )
);
Tab.displayName = "Tab";

export { Tab, Tabs };
