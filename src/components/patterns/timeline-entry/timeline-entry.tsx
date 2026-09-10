"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { memo } from "react";
import type { IconProps } from "@/components/elements/ui/icon/icon";
import { Icon } from "@/components/elements/ui/icon/icon";
import {
  Step,
  StepBody,
  StepContent,
  StepIndicator,
  StepSeparator,
  StepTitle,
} from "@/components/elements/ui/step/step";
import type { TechBadgeCloudItem } from "@/components/patterns/tech-badge-cloud/tech-badge-cloud";
import { TechBadgeCloud } from "@/components/patterns/tech-badge-cloud/tech-badge-cloud";

export interface TimelineEntryTextMetaRow {
  icon: IconProps;
  text: string;
  type?: "text";
}

export interface TimelineEntryBadgesMetaRow {
  items: TechBadgeCloudItem[];
  type: "badges";
}

export type TimelineEntryMetaRow =
  | TimelineEntryBadgesMetaRow
  | TimelineEntryTextMetaRow;

export interface TimelineEntryProps {
  body: ReactNode;
  indicatorIcon?: IconProps;
  metaRows: TimelineEntryMetaRow[];
  title: string;
}

const entryVariants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 0.8,
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.05,
    },
  },
};

const charVariants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 220,
      damping: 14,
    },
  },
};

const metaContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const metaRowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 140,
      damping: 12,
    },
  },
};

const bodyVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    clipPath: "inset(0% 0% 100% 0%)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 14,
    },
  },
};

/**
 * A single entry in a vertical timeline.
 * All date formatting and text joining belongs in the adapter.
 */
const TimelineEntry = memo(
  ({ title, indicatorIcon, metaRows, body }: TimelineEntryProps) => {
    const titleChars = Array.from(title).map((char, index) => ({
      id: `title-char-${index}`,
      char,
    }));

    return (
      <m.div
        className="w-full"
        initial="hidden"
        variants={entryVariants}
        viewport={{ once: true, margin: "-60px" }}
        whileInView="visible"
      >
        <Step>
          <StepSeparator>
            <StepIndicator>
              <Icon {...indicatorIcon} />
            </StepIndicator>
          </StepSeparator>
          <StepBody>
            <StepTitle className="mb-3">
              <span className="sr-only">{title}</span>
              <m.span
                aria-hidden="true"
                style={{ display: "inline-flex", flexWrap: "wrap" }}
                variants={titleVariants}
              >
                {titleChars.map(({ id, char }) => (
                  <m.span
                    key={id}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                    variants={charVariants}
                  >
                    {char}
                  </m.span>
                ))}
              </m.span>
            </StepTitle>
            <StepContent className="flex flex-col">
              <m.div
                className="flex flex-col gap-2"
                variants={metaContainerVariants}
              >
                {metaRows.map((row) =>
                  row.type === "badges" ? (
                    <m.div
                      key={`badges-${row.items.map((item) => item.label).join("-")}`}
                      variants={metaRowVariants}
                    >
                      <TechBadgeCloud items={row.items} />
                    </m.div>
                  ) : (
                    <m.div
                      className="flex items-center gap-2 text-base-content/80 text-sm md:text-lg"
                      key={row.text}
                      variants={metaRowVariants}
                    >
                      <Icon {...row.icon} />
                      <span>{row.text}</span>
                    </m.div>
                  )
                )}
              </m.div>
            </StepContent>
            <m.div className="mt-4 w-full" variants={bodyVariants}>
              {body}
            </m.div>
          </StepBody>
        </Step>
      </m.div>
    );
  }
);
TimelineEntry.displayName = "TimelineEntry";

export { TimelineEntry };
