import type { HTMLAttributes } from "react";
export type LoadingVariant =
  | "spinner"
  | "dots"
  | "ring"
  | "ball"
  | "bars"
  | "infinity";
export type LoadingSize = "xs" | "sm" | "md" | "lg";
export type LoadingProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: LoadingVariant;
  size?: LoadingSize;
};
