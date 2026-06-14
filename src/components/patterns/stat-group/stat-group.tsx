import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import type { IconProps } from "@/components/elements/icon/icon";
import { Icon } from "@/components/elements/icon/icon";
import {
  Stat,
  StatDescription,
  StatFigure,
  Stats,
  StatTitle,
} from "@/components/elements/stat/stat";
import { cn } from "@/lib/utils";

export interface StatGroupProps extends HTMLAttributes<HTMLDivElement> {
  icon?: IconProps;
  label: string;
  value: string;
}

/** A stat card: icon figure + label + value */
const StatGroup = memo(
  forwardRef<HTMLDivElement, StatGroupProps>(
    ({ label, value, icon, className, ...props }, ref) => (
      <Stats className={cn("", className)} ref={ref} {...props}>
        <Stat>
          {icon && (
            <StatFigure>
              <Icon {...icon} />
            </StatFigure>
          )}
          <StatTitle>{label}</StatTitle>
          <StatDescription>{value}</StatDescription>
        </Stat>
      </Stats>
    )
  )
);
StatGroup.displayName = "StatGroup";

export { StatGroup };
