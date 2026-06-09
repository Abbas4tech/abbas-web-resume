import { memo } from "react";
import { Icon } from "@/components/elements/icon";
import {
  Step,
  StepBody,
  StepContent,
  StepIndicator,
  StepSeparator,
  StepTitle,
} from "@/components/elements/step";
import type { TimelineEntryProps } from "./types";

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
        <StepTitle>{title}</StepTitle>
        <StepContent>
          {metaRows.map((row) => (
            <div className="mb-1 flex items-center gap-2" key={row.text}>
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
