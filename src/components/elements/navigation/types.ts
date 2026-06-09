import type { AosOptions } from "aos";
import type { HTMLAttributes } from "react";

export interface NavigationAnimationProps
  extends HTMLAttributes<HTMLDivElement> {
  options: AosOptions;
}
