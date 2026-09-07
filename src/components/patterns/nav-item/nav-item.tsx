"use client";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { Button } from "@/components/elements/ui/button/button";
import { Icon } from "@/components/elements/ui/icon/icon";
import { cn } from "@/lib/utils";

export interface NavItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  href: string;
  iconClasses?: string[];
  iconCode: string;
  iconName?: string;
  isActive?: boolean;
  label: string;
  /** Fired when the link is activated (click, or Enter/Space via its own focus). */
  onClick?: () => void;
}

const NavItem = memo(
  forwardRef<HTMLDivElement, NavItemProps>(
    (
      {
        href,
        label,
        iconCode,
        iconClasses,
        iconName,
        isActive,
        className,
        onClick,
        ...props
      },
      ref
    ) => (
      <div className={cn("w-full text-left", className)} ref={ref} {...props}>
        <Button
          asLink={true}
          className={cn(
            "flex w-full items-center gap-2 px-4 py-2 md:py-3",
            isActive && "font-bold"
          )}
          href={href}
          onClick={onClick}
        >
          <Icon
            classes={iconClasses ?? []}
            iconCode={iconCode}
            name={iconName}
            showTooltip={false}
          />
          {label}
        </Button>
      </div>
    )
  )
);
NavItem.displayName = "NavItem";

export { NavItem };
