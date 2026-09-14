import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { type ComponentRef, forwardRef, memo } from "react";
import type { LinkProps } from "@/components/elements/ui/link/link";
import { Link } from "@/components/elements/ui/link/link";
import { cn } from "@/lib/utils";

export type DockProps = HTMLAttributes<HTMLDivElement>;

export type DockItemProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    icon: ReactNode;
  };

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
