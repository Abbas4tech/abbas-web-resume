import type { Document } from "@contentful/rich-text-types";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import {
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/elements/behavior/motion-stagger/motion-stagger";
import { AccordionItem } from "@/components/elements/ui/accordion/accordion";
import { RichText } from "@/components/patterns/rich-text/rich-text";
import { cn } from "@/lib/utils";

export interface FaqAccordionItem {
  answer: Document;
  question: string;
}

export interface FaqAccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: FaqAccordionItem[];
}

const FaqAccordion = memo(
  forwardRef<HTMLDivElement, FaqAccordionProps>(
    ({ className, items, ...props }, ref) => (
      <MotionStaggerContainer
        as="div"
        className={cn("flex flex-col gap-2", className)}
        ref={ref}
        {...props}
      >
        {items.map((item) => (
          <MotionStaggerItem as="div" key={item.question}>
            <AccordionItem name="faq-accordion" title={item.question}>
              <RichText document={item.answer} />
            </AccordionItem>
          </MotionStaggerItem>
        ))}
      </MotionStaggerContainer>
    )
  )
);
FaqAccordion.displayName = "FaqAccordion";

export { FaqAccordion };
