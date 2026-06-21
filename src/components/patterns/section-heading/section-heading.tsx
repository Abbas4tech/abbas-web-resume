// biome-ignore lint/performance/noNamespaceImport: required for motion dynamic components
import * as motion from "motion/react-client";
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps
  extends HTMLAttributes<HTMLHeadingElement> {
  /** Optional leading icon (pass a rendered <Icon /> from the element layer) */
  icon?: ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
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
 * Visual heading with optional leading icon.
 * Used across all pages as the section title (h2).
 */
const SectionHeading = memo(
  forwardRef<HTMLHeadingElement, SectionHeadingProps>(
    ({ className, icon, children, ...props }, ref) => {
      const isString = typeof children === "string";
      const chars = isString ? Array.from(children as string) : [];

      return (
        <h2
          className={cn(
            "mb-4 flex items-center font-bold text-xl md:text-3xl",
            className
          )}
          ref={ref}
          {...props}
        >
          <span className="sr-only">{children}</span>
          <motion.span
            aria-hidden="true"
            className="flex flex-wrap items-center"
            initial="hidden"
            variants={containerVariants}
            viewport={{ once: true, margin: "-20px" }}
            whileInView="visible"
          >
            {icon && (
              <motion.span
                className="flex items-center"
                style={{ display: "inline-flex", marginRight: "1rem" }}
                variants={itemVariants}
              >
                {icon}
              </motion.span>
            )}

            {isString ? (
              chars.map((char, index) => (
                <motion.span
                  // biome-ignore lint/suspicious/noArrayIndexKey: characters repeat, index is unique
                  key={index}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                  variants={itemVariants}
                >
                  {char}
                </motion.span>
              ))
            ) : (
              <motion.span variants={itemVariants}>{children}</motion.span>
            )}
          </motion.span>
        </h2>
      );
    }
  )
);
SectionHeading.displayName = "SectionHeading";

export { SectionHeading };
