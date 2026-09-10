import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef, memo } from "react";
import { MockupBrowser } from "@/components/elements/ui/mockup-browser/mockup-browser";
import { MockupCode } from "@/components/elements/ui/mockup-code/mockup-code";
import {
  MockupPhone,
  MockupPhoneCamera,
  MockupPhoneDisplay,
} from "@/components/elements/ui/mockup-phone/mockup-phone";
import {
  MockupWindow,
  MockupWindowBody,
} from "@/components/elements/ui/mockup-window/mockup-window";
import { cn } from "@/lib/utils";

export type MockupShowcaseFrameVariant =
  | "browser"
  | "code"
  | "phone"
  | "window";

export interface MockupShowcaseFrameProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: MockupShowcaseFrameVariant;
}

/** Picks the right Mockup* Element shell for the given variant. */
const MockupShowcaseFrame = memo(
  forwardRef<HTMLDivElement, MockupShowcaseFrameProps>(
    ({ className, variant = "window", children, ...props }, ref) => {
      if (variant === "browser") {
        return (
          <MockupBrowser className={cn(className)} ref={ref} {...props}>
            {children}
          </MockupBrowser>
        );
      }

      if (variant === "phone") {
        return (
          <MockupPhone className={cn(className)} ref={ref} {...props}>
            <MockupPhoneCamera />
            <MockupPhoneDisplay>{children}</MockupPhoneDisplay>
          </MockupPhone>
        );
      }

      if (variant === "code") {
        return (
          <MockupCode className={cn(className)} ref={ref} {...props}>
            {children}
          </MockupCode>
        );
      }

      return (
        <MockupWindow className={cn(className)} ref={ref} {...props}>
          <MockupWindowBody>{children}</MockupWindowBody>
        </MockupWindow>
      );
    }
  )
);
MockupShowcaseFrame.displayName = "MockupShowcaseFrame";

export { MockupShowcaseFrame };
