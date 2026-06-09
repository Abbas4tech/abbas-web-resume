import { forwardRef, memo } from "react";
import { Icon } from "@/components/elements/icon";
import {
  MockupWindow,
  MockupWindowBody,
} from "@/components/elements/mockup-window";
import { PageContent } from "@/components/elements/page";
import { IconCluster } from "@/components/patterns/icon-cluster";
import { IconProgressGroup } from "@/components/patterns/icon-progress-group";
import { IconProgressRow } from "@/components/patterns/icon-progress-row";
import { SectionHeading } from "@/components/patterns/section-heading";
import { cn } from "@/lib/utils";
import type { PanelShowcaseProps } from "./types";

const PanelShowcase = memo(
  forwardRef<HTMLDivElement, PanelShowcaseProps>(
    ({ className, animation, panels, ...props }, ref) => (
      <PageContent
        className={cn("flex flex-col gap-4", className)}
        data-aos={animation}
        ref={ref}
        {...props}
      >
        {panels.map((panel) => (
          <MockupWindow key={panel.title}>
            <MockupWindowBody>
              <SectionHeading icon={<Icon {...panel.headingIcon} />}>
                {panel.title}
              </SectionHeading>
              <IconProgressGroup>
                {panel.rows.map((row) => (
                  <IconProgressRow
                    key={`${panel.title}-progress-${row.progress}`}
                    progress={row.progress}
                  >
                    <IconCluster>
                      {row.icons.map((iconProps) => (
                        <Icon
                          key={`${panel.title}-progress-${row.progress}-${iconProps.iconCode || iconProps.name}`}
                          {...iconProps}
                        />
                      ))}
                    </IconCluster>
                  </IconProgressRow>
                ))}
              </IconProgressGroup>
            </MockupWindowBody>
          </MockupWindow>
        ))}
      </PageContent>
    )
  )
);
PanelShowcase.displayName = "PanelShowcase";

export { PanelShowcase };
