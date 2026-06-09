import type { HTMLAttributes, ReactNode } from "react";

export interface SectionHeadingProps
  extends HTMLAttributes<HTMLHeadingElement> {
  /** Optional leading icon (pass a rendered <Icon /> from the element layer) */
  icon?: ReactNode;
}
