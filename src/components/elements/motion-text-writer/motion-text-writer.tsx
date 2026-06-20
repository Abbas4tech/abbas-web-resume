"use client";

// biome-ignore lint/performance/noNamespaceImport: required for motion dynamic components
import * as motion from "motion/react-client";
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
  const characters = Array.from(text);

  return (
    <span
      className={className}
      style={{ display: "inline-flex", flexWrap: "wrap" }}
    >
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        style={{ display: "inline-flex", flexWrap: "wrap" }}
        variants={containerVariants}
        whileInView="visible"
      >
        {characters.map((char, index) => (
          <motion.span
            // biome-ignore lint/suspicious/noArrayIndexKey: characters can repeat, index is the only unique key
            key={index}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
            }}
            variants={charVariants}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
});

MotionTextWriter.displayName = "MotionTextWriter";

export { MotionTextWriter };
