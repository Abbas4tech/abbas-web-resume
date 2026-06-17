import type { ReactNode } from "react";
import { memo } from "react";
import type { IconProps } from "@/components/elements/icon/icon";
import { Icon } from "@/components/elements/icon/icon";
import {
  Step,
  StepBody,
  StepContent,
  StepIndicator,
  StepSeparator,
  StepTitle,
} from "@/components/elements/step/step";

export interface TimelineEntryMetaRow {
  icon: IconProps;
  text: string;
}

export interface TimelineEntryProps {
  body: ReactNode;
  indicatorIcon?: IconProps;
  metaRows: TimelineEntryMetaRow[];
  title: string;
}

/**
 * A single entry in a vertical timeline.
 * All date formatting and text joining belongs in the adapter.
 */
const TimelineEntry = memo(
  ({ title, indicatorIcon, metaRows, body }: TimelineEntryProps) => (
    <Step>
      <StepSeparator>
        <StepIndicator>
          <Icon {...indicatorIcon} />
        </StepIndicator>
      </StepSeparator>
      <StepBody>
        <StepTitle className="mb-3">{title}</StepTitle>
        <StepContent className="flex flex-col">
          {metaRows.map((row) => (
            <div className="flex items-center gap-2" key={row.text}>
              <Icon {...row.icon} />
              {row.text}
            </div>
          ))}
        </StepContent>
        {body}
      </StepBody>
    </Step>
  )
);
TimelineEntry.displayName = "TimelineEntry";

export { TimelineEntry };
