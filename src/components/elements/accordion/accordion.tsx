import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
export type AccordionProps = HTMLAttributes<HTMLDivElement>;
export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  title: ReactNode;
};

import { forwardRef, memo } from "react";

const Accordion = memo(
  forwardRef<HTMLDivElement, AccordionProps>(({ className, ...props }, ref) => (
    <div className={cn("", className)} ref={ref} {...props} />
  ))
);
Accordion.displayName = "Accordion";
const AccordionItem = memo(
  forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ className, name, title, children, ...props }, ref) => (
      <div
        className={cn("collapse-arrow collapse bg-base-300", className)}
        ref={ref}
        {...props}
      >
        <input name={name} type="radio" />
        <div className="collapse-title font-semibold">{title}</div>
        <div className="collapse-content">{children}</div>
      </div>
    )
  )
);
AccordionItem.displayName = "AccordionItem";

export { Accordion, AccordionItem };
