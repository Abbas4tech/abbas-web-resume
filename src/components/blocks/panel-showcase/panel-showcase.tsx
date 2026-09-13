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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/elements/ui/table/table";
import { IconCluster } from "@/components/patterns/icon-cluster/icon-cluster";
import type { IconProgressRowProps } from "@/components/patterns/icon-progress-row/icon-progress-row";
import { IconProgressRow } from "@/components/patterns/icon-progress-row/icon-progress-row";
import { IconRadialProgressRow } from "@/components/patterns/icon-radial-progress-row/icon-radial-progress-row";
import { SectionHeading } from "@/components/patterns/section-heading/section-heading";

import { cn } from "@/lib/utils";

export interface PanelShowcaseRow
  extends Pick<IconProgressRowProps, "progress"> {
  icons: IconProps[];
  label: string;
  /** Render style for the progress indicator — defaults to "linear". */
  variant?: "linear" | "radial";
}

export interface PanelShowcasePanel {
  headingIcon: IconProps;
  rows: PanelShowcaseRow[];
  title: string;
}

export interface PanelShowcaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Overall layout — "panels" (default) is the original MockupWindow grid; "table" is a dense skills matrix. */
  layout?: "panels" | "table";
  panels: PanelShowcasePanel[];
}

function PanelRows({ panel }: Readonly<{ panel: PanelShowcasePanel }>) {
  return (
    <div className="grid grid-cols-1 gap-8 p-2 md:grid-cols-2 md:p-4">
      {panel.rows.map((row) => {
        const RowComponent =
          row.variant === "radial" ? IconRadialProgressRow : IconProgressRow;
        return (
          <RowComponent
            key={`${panel.title}-${row.label}`}
            label={row.label}
            progress={row.progress}
          >
            <IconCluster>
              {row.icons.map((iconProps) => (
                <Icon
                  classes={[
                    "w-5",
                    "h-5",
                    "sm:h-7",
                    "sm:w-7",
                    "lg:w-9",
                    "lg:h-9",
                  ]}
                  key={`${panel.title}-progress-${row.progress}-${iconProps.iconCode || iconProps.name}`}
                  size="20"
                  {...iconProps}
                />
              ))}
            </IconCluster>
          </RowComponent>
        );
      })}
    </div>
  );
}

function PanelShowcaseTable({
  panels,
}: Readonly<{ panels: PanelShowcasePanel[] }>) {
  return (
    <Table data-testid="skills-matrix-table">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Skill</TableHeaderCell>
          <TableHeaderCell>Proficiency</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {panels.flatMap((panel) =>
          panel.rows.map((row) => (
            <TableRow key={`${panel.title}-${row.label}`}>
              <TableCell>{panel.title}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <IconCluster>
                    {row.icons.map((iconProps) => (
                      <Icon
                        key={`${panel.title}-${row.label}-${iconProps.iconCode || iconProps.name}`}
                        size="20"
                        {...iconProps}
                      />
                    ))}
                  </IconCluster>
                  {row.label}
                </div>
              </TableCell>
              <TableCell>
                <progress
                  aria-label={row.label}
                  className="progress progress-warning w-24"
                  max={100}
                  value={row.progress}
                >
                  {row.progress}%
                </progress>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

const PanelShowcase = memo(
  forwardRef<HTMLDivElement, PanelShowcaseProps>(
    ({ className, panels, layout = "panels", ...props }, ref) => {
      if (layout === "table") {
        return (
          <PageContent className={cn(className)} ref={ref} {...props}>
            <PanelShowcaseTable panels={panels} />
          </PageContent>
        );
      }

      return (
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
                  <PanelRows panel={panel} />
                </MockupWindowBody>
              </MockupWindow>
            </MotionWrapper>
          ))}
        </PageContent>
      );
    }
  )
);
PanelShowcase.displayName = "PanelShowcase";

export { PanelShowcase };
