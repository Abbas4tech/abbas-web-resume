import Link from "next/link";
import { type ComponentRef, forwardRef, memo } from "react";

import { cn } from "@/lib/utils";
import type { DockItemProps, DockProps } from "./types";

const Dock = memo(
  forwardRef<HTMLDivElement, DockProps>(({ className, ...props }, ref) => (
    <div {...props} className={cn("dock dock-md", className)} ref={ref} />
  ))
);
Dock.displayName = "Dock";

const DockItem = memo(
  forwardRef<ComponentRef<typeof Link>, DockItemProps>(
    ({ icon: _icon, children, className, ...props }, ref) => (
      <Link {...props} className={cn("", className)} ref={ref}>
        {_icon}
        <span className="dock-label">{children}</span>
      </Link>
    )
  )
);
DockItem.displayName = "DockItem";

export { Dock, DockItem };
