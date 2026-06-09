import type { HTMLAttributes } from "react";

export interface IconProgressRowProps extends HTMLAttributes<HTMLDivElement> {
  /** 0-100 progress value */
  progress: number;
}
