import type { HTMLAttributes } from "react";
import type { IconProps } from "@/components/elements/icon/types";

export interface AppHeaderProps extends HTMLAttributes<HTMLElement> {
  defaultRoute: string;
  defaultTheme: string;
  resumeIcon: IconProps;
  resumeUrl: string;
  themeIcon?: IconProps;
  themes: string[];
  title: string;
}
