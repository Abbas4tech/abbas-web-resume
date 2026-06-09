import type { HTMLAttributes, ReactNode } from "react";
export type AccordionProps = HTMLAttributes<HTMLDivElement>;
export type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  title: ReactNode;
};
