import Link, { type LinkProps } from "next/link";
import {
  type AnchorHTMLAttributes,
  type ComponentRef,
  forwardRef,
  type HTMLAttributes,
  memo,
} from "react";
import { cn } from "@/lib/utils";
import type { Icon as IconType } from "@/types/common";

import { Icon } from "./icon";

const Dock = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div {...props} className={cn("dock dock-md", className)} ref={ref} />
  ))
);

type DockButtonProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    icon: IconType;
  };

const DockButton = memo(
  forwardRef<ComponentRef<typeof Link>, DockButtonProps>(
    ({ icon, children, className, ...props }, ref) => (
      <Link {...props} className={cn("", className)} ref={ref}>
        <Icon {...icon} />
        <span className="dock-label">{children}</span>
      </Link>
    )
  )
);

DockButton.displayName = "DockButton";

export { Dock, DockButton };
