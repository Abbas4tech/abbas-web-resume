"use client";

import { m } from "motion/react";
import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MotionHoverProps {
  as?: "div" | "span" | "li" | "a" | "button";
  children: ReactNode;
  className?: string;
  rotate?: number;
  scale?: number;
  tapScale?: number;
}

const MotionHover = memo(
  ({
    children,
    className,
    as = "div",
    scale = 1.1,
    rotate = 0,
    tapScale = 0.95,
  }: MotionHoverProps) => {
    const Component = m[as];

    return (
      <Component
        className={cn("inline-block", className)}
        transition={{ type: "spring", stiffness: 400, damping: 17, mass: 1 }}
        whileHover={{ scale, rotate }}
        whileTap={{ scale: tapScale }}
      >
        {children}
      </Component>
    );
  }
);
MotionHover.displayName = "MotionHover";

export { MotionHover };
