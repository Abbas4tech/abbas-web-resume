import type { HTMLAttributes } from "react";
export type AlertVariant = "info" | "success" | "warning" | "error";
export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
};
