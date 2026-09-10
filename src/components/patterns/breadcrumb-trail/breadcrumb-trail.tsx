import Link from "next/link";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsList,
} from "@/components/elements/ui/breadcrumbs/breadcrumbs";
import type { IconProps } from "@/components/elements/ui/icon/icon";
import { Icon } from "@/components/elements/ui/icon/icon";
import { cn } from "@/lib/utils";

export interface BreadcrumbTrailItem {
  href: string;
  icon?: IconProps;
  label: string;
}

export interface BreadcrumbTrailProps extends HTMLAttributes<HTMLDivElement> {
  items: BreadcrumbTrailItem[];
}

/** A page hierarchy trail — every item but the last links out; the last is the current page. */
const BreadcrumbTrail = memo(
  forwardRef<HTMLDivElement, BreadcrumbTrailProps>(
    ({ className, items, ...props }, ref) => (
      <Breadcrumbs className={cn(className)} ref={ref} {...props}>
        <BreadcrumbsList>
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1;
            return (
              <BreadcrumbsItem key={item.href}>
                {isCurrent ? (
                  <span
                    aria-current="page"
                    className="inline-flex items-center gap-1"
                  >
                    {item.icon && (
                      <Icon {...item.icon} showTooltip={false} size="16" />
                    )}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    className="inline-flex items-center gap-1"
                    href={item.href}
                  >
                    {item.icon && (
                      <Icon {...item.icon} showTooltip={false} size="16" />
                    )}
                    {item.label}
                  </Link>
                )}
              </BreadcrumbsItem>
            );
          })}
        </BreadcrumbsList>
      </Breadcrumbs>
    )
  )
);
BreadcrumbTrail.displayName = "BreadcrumbTrail";

export { BreadcrumbTrail };
