import type { HTMLAttributes } from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "outline";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};
