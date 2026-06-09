import { forwardRef, memo } from "react";
import { PageContent } from "@/components/elements/page";
import { InfoStatRow } from "@/components/patterns/info-stat-row";
import { RichText } from "@/components/patterns/rich-text";
import { cn } from "@/lib/utils";
import type { BioSectionProps } from "./types";

const BioSection = memo(
  forwardRef<HTMLDivElement, BioSectionProps>(
    ({ className, description, infoRows, animation, ...props }, ref) => (
      <PageContent
        className={cn("", className)}
        data-aos={animation}
        ref={ref}
        {...props}
      >
        <div className="mb-4 rounded-xl bg-base-300 p-4">
          <RichText
            document={description.document}
            paragraphClass="py-1.5 text-center lg:text-xl"
          />
        </div>
        <div className="my-2 grid grid-cols-1 gap-4 rounded-xl md:grid-cols-2">
          {infoRows.map((row) => (
            <InfoStatRow key={row.label} {...row} />
          ))}
        </div>
      </PageContent>
    )
  )
);
BioSection.displayName = "BioSection";

export { BioSection };
