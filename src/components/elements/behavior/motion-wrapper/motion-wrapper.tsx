"use client";

import { m, type Variants } from "motion/react";
import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AnimationType =
  | "fade-up"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "zoom-in";

export interface MotionWrapperProps {
  animation?: AnimationType;
  as?:
    | "div"
    | "span"
    | "section"
    | "li"
    | "ul"
    | "header"
    | "nav"
    | "footer"
    | "article";
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

const variants: Record<AnimationType, Variants> = {
  "fade-up": {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  "fade-in": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  "slide-left": {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  "slide-right": {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
};

const MotionWrapper = memo(
  ({
    children,
    animation = "fade-up",
    delay = 0,
    className,
    as = "div",
    once = true,
  }: MotionWrapperProps) => {
    const Component = m[as];

    return (
      <Component
        className={cn(className)}
        initial="initial"
        transition={{
          delay,
          type: "spring",
          stiffness: 120,
          damping: 14,
          mass: 1,
        }}
        variants={variants[animation]}
        viewport={{ once, margin: "-50px" }}
        whileInView="animate"
      >
        {children}
      </Component>
    );
  }
);
MotionWrapper.displayName = "MotionWrapper";

export { MotionWrapper };
