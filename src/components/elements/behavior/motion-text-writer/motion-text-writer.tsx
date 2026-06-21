"use client";

import { m } from "motion/react";
import { memo } from "react";

export interface MotionTextWriterProps {
  /** Optional custom CSS class */
  className?: string;
  /** The text content to animate/type out */
  text: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
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

/**
 * A highly premium text typing animation element that splits text into individual
 * characters and animates them sequentially with spring physics.
 */
const MotionTextWriter = memo(({ text, className }: MotionTextWriterProps) => {
  const characters = Array.from(text).map((char, index) => ({
    id: `writer-char-${index}`,
    char,
  }));

  return (
    <span
      className={className}
      style={{ display: "inline-flex", flexWrap: "wrap" }}
    >
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden="true"
        initial="hidden"
        style={{ display: "inline-flex", flexWrap: "wrap" }}
        variants={containerVariants}
        whileInView="visible"
      >
        {characters.map(({ id, char }) => (
          <m.span
            key={id}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
            }}
            variants={charVariants}
          >
            {char}
          </m.span>
        ))}
      </m.span>
    </span>
  );
});

MotionTextWriter.displayName = "MotionTextWriter";

export { MotionTextWriter };
