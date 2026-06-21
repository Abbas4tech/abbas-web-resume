"use client";

import { m } from "motion/react";
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
      const chars = isString
        ? Array.from(children as string).map((char, index) => ({
            id: `heading-char-${index}`,
            char,
          }))
        : [];

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
          <m.span
            aria-hidden="true"
            className="flex flex-wrap items-center"
            initial="hidden"
            variants={containerVariants}
            viewport={{ once: true, margin: "-20px" }}
            whileInView="visible"
          >
            {icon && (
              <m.span
                className="flex items-center"
                style={{ display: "inline-flex", marginRight: "1rem" }}
                variants={itemVariants}
              >
                {icon}
              </m.span>
            )}

            {isString ? (
              chars.map(({ id, char }) => (
                <m.span
                  key={id}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                  variants={itemVariants}
                >
                  {char}
                </m.span>
              ))
            ) : (
              <m.span variants={itemVariants}>{children}</m.span>
            )}
          </m.span>
        </h2>
      );
    }
  )
);
SectionHeading.displayName = "SectionHeading";

export { SectionHeading };
