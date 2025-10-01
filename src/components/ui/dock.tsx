import React, {
  forwardRef,
  HTMLAttributes,
  memo,
  AnchorHTMLAttributes,
  ComponentRef,
} from "react";
import Link, { LinkProps } from "next/link";

import { Icon as IconType } from "@/types/common";
import { cn } from "@/lib/utils";

import { Icon } from "./icon";

const Dock = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div {...props} ref={ref} className={cn("dock dock-md", className)} />
    )
  )
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
