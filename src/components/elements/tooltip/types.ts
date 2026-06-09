import type { HTMLAttributes } from "react";
export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  tip: string;
  position?: TooltipPosition;
};
