import { forwardRef, memo } from "react";
import { Icon } from "@/components/elements/icon";
import {
  Stat,
  StatDescription,
  StatFigure,
  Stats,
  StatTitle,
} from "@/components/elements/stat";
import { cn } from "@/lib/utils";
import type { InfoStatRowProps } from "./types";

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
