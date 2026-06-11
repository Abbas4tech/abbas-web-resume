"use client";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { Button } from "@/components/elements/button/button";
import { Icon } from "@/components/elements/icon/icon";
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
            isActive &&
              "transform border-primary bg-base-200 font-bold transition-all duration-200 ease-out group-data-[side='right']:border-r-4 group-data-[side='left']:border-l-4"
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
