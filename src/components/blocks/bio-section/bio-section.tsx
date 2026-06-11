import type { Document } from "@contentful/rich-text-types";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import type { InfoStatRowProps } from "@/components/patterns/info-stat-row/info-stat-row";
import { InfoStatRow } from "@/components/patterns/info-stat-row/info-stat-row";
import { RichText } from "@/components/patterns/rich-text/rich-text";
import { cn } from "@/lib/utils";

export interface BioSectionProps extends HTMLAttributes<HTMLDivElement> {
  animation?: string;
  description?: Document;
  infoRows: InfoStatRowProps[];
}

const BioSection = memo(
  forwardRef<HTMLDivElement, BioSectionProps>(
    ({ className, description, infoRows, animation, ...props }, ref) => (
      <div
        className={cn("flex flex-col gap-4", className)}
        data-aos={animation}
        ref={ref}
        {...props}
      >
        {description && (
          <div className="rounded-xl bg-base-300 p-4">
            <RichText
              document={description}
              paragraphClass="py-1.5 text-center lg:text-xl"
            />
          </div>
        )}
        {infoRows.length ? (
          <div className="grid grid-cols-1 gap-4 rounded-xl md:grid-cols-2">
            {infoRows.map((row) => (
              <InfoStatRow key={row.label} {...row} />
            ))}
          </div>
        ) : null}
      </div>
    )
  )
);
BioSection.displayName = "BioSection";

export { BioSection };
