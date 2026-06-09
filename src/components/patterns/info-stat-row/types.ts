import type { HTMLAttributes } from "react";
import type { IconProps } from "@/components/elements/icon/types";

export interface InfoStatRowProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconProps;
  label: string;
  value: string;
}
