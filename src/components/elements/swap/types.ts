import type { HTMLAttributes, ReactNode } from "react";
export type SwapProps = HTMLAttributes<HTMLLabelElement> & {
  active?: boolean;
  onContent: ReactNode;
  offContent: ReactNode;
  rotate?: boolean;
};
