import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { MotionWrapper } from "@/components/elements/behavior/motion-wrapper/motion-wrapper";
import type { IconProps } from "@/components/elements/ui/icon/icon";
import { Icon } from "@/components/elements/ui/icon/icon";
import {
  MockupWindow,
  MockupWindowBody,
} from "@/components/elements/ui/mockup-window/mockup-window";
import { PageContent } from "@/components/elements/ui/page/page";
import { IconCluster } from "@/components/patterns/icon-cluster/icon-cluster";
import type { IconProgressRowProps } from "@/components/patterns/icon-progress-row/icon-progress-row";
import { IconProgressRow } from "@/components/patterns/icon-progress-row/icon-progress-row";
import { SectionHeading } from "@/components/patterns/section-heading/section-heading";

import { cn } from "@/lib/utils";

export interface PanelShowcaseRow
  extends Pick<IconProgressRowProps, "progress"> {
  icons: IconProps[];
}

export interface PanelShowcasePanel {
  headingIcon: IconProps;
  rows: PanelShowcaseRow[];
  title: string;
}

export interface PanelShowcaseProps extends HTMLAttributes<HTMLDivElement> {
  panels: PanelShowcasePanel[];
}

const PanelShowcase = memo(
  forwardRef<HTMLDivElement, PanelShowcaseProps>(
    ({ className, panels, ...props }, ref) => (
      <PageContent
        className={cn("flex flex-col gap-4", className)}
        ref={ref}
        {...props}
      >
        {panels.map((panel, index) => (
          <MotionWrapper
            animation="fade-up"
            delay={index * 0.2}
            key={panel.title}
          >
            <MockupWindow>
              <MockupWindowBody>
                <SectionHeading icon={<Icon {...panel.headingIcon} />}>
                  {panel.title}
                </SectionHeading>
                <div className="grid grid-cols-1 gap-8 p-2 md:grid-cols-2 md:p-4">
                  {panel.rows.map((row) => (
                    <IconProgressRow
                      key={`${panel.title}-progress-${row.progress}`}
                      progress={row.progress}
                    >
                      <IconCluster>
                        {row.icons.map((iconProps) => (
                          <Icon
                            key={`${panel.title}-progress-${row.progress}-${iconProps.iconCode || iconProps.name}`}
                            size="36"
                            {...iconProps}
                          />
                        ))}
                      </IconCluster>
                    </IconProgressRow>
                  ))}
                </div>
              </MockupWindowBody>
            </MockupWindow>
          </MotionWrapper>
        ))}
      </PageContent>
    )
  )
);
PanelShowcase.displayName = "PanelShowcase";

export { PanelShowcase };
