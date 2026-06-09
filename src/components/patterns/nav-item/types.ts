import type { HTMLAttributes } from "react";

export interface NavItemProps extends HTMLAttributes<HTMLDivElement> {
  href: string;
  iconClasses?: string[];
  iconCode: string;
  iconName?: string;
  isActive?: boolean;
  label: string;
}
