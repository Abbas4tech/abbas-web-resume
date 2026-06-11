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

export interface InfoStatRowProps extends HTMLAttributes<HTMLDivElement> {
  icon: IconProps;
  label: string;
  value: string;
}

/** A stat card: icon figure + label + value */
const InfoStatRow = memo(
  forwardRef<HTMLDivElement, InfoStatRowProps>(
    ({ label, value, icon, className, ...props }, ref) => (
      <Stats className={cn("", className)} ref={ref} {...props}>
        <Stat>
          <StatFigure>
            <Icon {...icon} />
          </StatFigure>
          <StatTitle>{label}</StatTitle>
          <StatDescription>{value}</StatDescription>
        </Stat>
      </Stats>
    )
  )
);
InfoStatRow.displayName = "InfoStatRow";

export { InfoStatRow };
