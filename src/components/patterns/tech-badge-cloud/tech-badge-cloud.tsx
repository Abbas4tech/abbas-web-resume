import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { MotionHover } from "@/components/elements/behavior/motion-hover/motion-hover";
import {
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/elements/behavior/motion-stagger/motion-stagger";
import { Badge } from "@/components/elements/ui/badge/badge";
import type { IconProps } from "@/components/elements/ui/icon/icon";
import { Icon } from "@/components/elements/ui/icon/icon";
import { cn } from "@/lib/utils";

export interface TechBadgeCloudItem {
  icon?: IconProps;
  label: string;
}

export interface TechBadgeCloudProps extends HTMLAttributes<HTMLDivElement> {
  items: TechBadgeCloudItem[];
}

const TechBadgeCloud = memo(
  forwardRef<HTMLDivElement, TechBadgeCloudProps>(
    ({ className, items, ...props }, ref) => (
      <MotionStaggerContainer
        as="div"
        className={cn("flex flex-wrap gap-2", className)}
        ref={ref}
        {...props}
      >
        {items.map((item) => (
          <MotionStaggerItem as="span" key={item.label}>
            <MotionHover scale={1.08} tapScale={0.94}>
              <Badge
                className="gap-1.5 border-base-content/20 px-3 py-3 text-sm transition-colors duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary"
                variant="outline"
              >
                {item.icon && (
                  <Icon {...item.icon} showTooltip={false} size="16" />
                )}
                {item.label}
              </Badge>
            </MotionHover>
          </MotionStaggerItem>
        ))}
      </MotionStaggerContainer>
    )
  )
);
TechBadgeCloud.displayName = "TechBadgeCloud";

export { TechBadgeCloud };
