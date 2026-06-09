import type { LinkProps } from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type DockProps = HTMLAttributes<HTMLDivElement>;

export type DockItemProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    icon: ReactNode;
  };
