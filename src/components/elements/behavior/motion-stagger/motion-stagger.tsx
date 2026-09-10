"use client";

import { type MotionProps, m } from "motion/react";
import {
  type ComponentType,
  forwardRef,
  type HTMLAttributes,
  memo,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const childVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 18,
      mass: 1.1,
    },
  },
};

type CleanHTMLAttributes = Omit<
  HTMLAttributes<HTMLElement>,
  "ref" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
>;

export interface MotionStaggerContainerProps extends CleanHTMLAttributes {
  as?: "div" | "ul" | "ol" | "section";
  children: ReactNode;
  className?: string;
}

/**
 * Structural grid/list wrapper for MotionStaggerItem children.
 * Deliberately has no whileInView of its own: a shared container-level trigger
 * fires as soon as any part of the (often much taller than the viewport) grid
 * scrolls into view at all, which then animates every child at once regardless
 * of how far down the page it actually sits. Each MotionStaggerItem tracks its
 * own visibility instead, so a card only animates once it is itself in view.
 */
const MotionStaggerContainer = memo(
  forwardRef<HTMLElement, MotionStaggerContainerProps>(
    ({ children, className, as = "div", ...rest }, ref) => {
      const Component = m[as] as ComponentType<
        { ref?: React.Ref<HTMLElement> } & CleanHTMLAttributes & MotionProps
      >;

      return (
        <Component className={cn(className)} ref={ref} {...rest}>
          {children}
        </Component>
      );
    }
  )
);
MotionStaggerContainer.displayName = "MotionStaggerContainer";

export interface MotionStaggerItemProps extends CleanHTMLAttributes {
  as?: "div" | "li" | "span" | "article" | "h1" | "h2" | "h3" | "p";
  children: ReactNode;
  className?: string;
  once?: boolean;
}

/** Animates in independently as soon as this specific item enters the viewport. */
const MotionStaggerItem = memo(
  ({
    children,
    className,
    as = "div",
    once = true,
    ...rest
  }: MotionStaggerItemProps) => {
    const Component = m[as] as ComponentType<CleanHTMLAttributes & MotionProps>;
    return (
      <Component
        className={cn(className)}
        initial="hidden"
        variants={childVariants}
        viewport={{ once, margin: "-60px" }}
        whileInView="visible"
        {...rest}
      >
        {children}
      </Component>
    );
  }
);
MotionStaggerItem.displayName = "MotionStaggerItem";

export { MotionStaggerContainer, MotionStaggerItem };
