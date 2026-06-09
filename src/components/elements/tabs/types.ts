import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
export type TabsVariant = "boxed" | "bordered" | "lifted";
export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  variant?: TabsVariant;
};
export type TabProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
};
