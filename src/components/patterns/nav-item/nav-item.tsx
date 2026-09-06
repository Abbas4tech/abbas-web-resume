"use client";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { Button } from "@/components/elements/ui/button/button";
import { Icon } from "@/components/elements/ui/icon/icon";
import { cn } from "@/lib/utils";

export interface NavItemProps extends HTMLAttributes<HTMLDivElement> {
  href: string;
  iconClasses?: string[];
  iconCode: string;
  iconName?: string;
  isActive?: boolean;
  label: string;
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
        ...props
      },
      ref
    ) => (
      <div className={cn("", className)} ref={ref} {...props}>
        <Button
          asLink={true}
          className={cn(
            "flex w-full items-center gap-2 px-4 py-2 md:py-3",
            isActive && "font-bold"
          )}
          href={href}
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
