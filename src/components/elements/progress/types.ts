import type { HTMLAttributes } from "react";

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  count: number;
};
