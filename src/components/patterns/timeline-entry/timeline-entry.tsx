"use client";

// biome-ignore lint/performance/noNamespaceImport: required for motion dynamic components
import * as motion from "motion/react-client";
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
    const titleChars = Array.from(title);

    return (
      <motion.div
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
              <motion.span
                aria-hidden="true"
                style={{ display: "inline-flex", flexWrap: "wrap" }}
                variants={titleVariants}
              >
                {titleChars.map((char, index) => (
                  <motion.span
                    // biome-ignore lint/suspicious/noArrayIndexKey: characters repeat, index is unique
                    key={index}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                    variants={charVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </StepTitle>
            <StepContent className="flex flex-col">
              <motion.div
                className="flex flex-col gap-2"
                variants={metaContainerVariants}
              >
                {metaRows.map((row) => (
                  <motion.div
                    className="flex items-center gap-2 text-base-content/80 text-sm"
                    key={row.text}
                    variants={metaRowVariants}
                  >
                    <Icon {...row.icon} />
                    <span>{row.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </StepContent>
            <motion.div className="mt-4 w-full" variants={bodyVariants}>
              {body}
            </motion.div>
          </StepBody>
        </Step>
      </motion.div>
    );
  }
);
TimelineEntry.displayName = "TimelineEntry";

export { TimelineEntry };
