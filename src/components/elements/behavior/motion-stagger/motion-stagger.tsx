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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

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
  once?: boolean;
}

/** Wraps a list/grid and stagger-animates each direct MotionStaggerItem child. */
const MotionStaggerContainer = memo(
  forwardRef<HTMLElement, MotionStaggerContainerProps>(
    ({ children, className, as = "div", once = true, ...rest }, ref) => {
      const Component = m[as] as ComponentType<
        { ref?: React.Ref<HTMLElement> } & CleanHTMLAttributes & MotionProps
      >;

      return (
        <Component
          className={cn(className)}
          initial="hidden"
          ref={ref}
          variants={containerVariants}
          viewport={{ once, margin: "-60px" }}
          whileInView="visible"
          {...rest}
        >
          {children}
        </Component>
      );
    }
  )
);
MotionStaggerContainer.displayName = "MotionStaggerContainer";

export interface MotionStaggerItemProps extends CleanHTMLAttributes {
  as?: "div" | "li" | "span" | "article";
  children: ReactNode;
  className?: string;
}

/** Each child inside a MotionStaggerContainer. Animates in orchestrated sequence. */
const MotionStaggerItem = memo(
  ({ children, className, as = "div", ...rest }: MotionStaggerItemProps) => {
    const Component = m[as] as ComponentType<CleanHTMLAttributes & MotionProps>;
    return (
      <Component className={cn(className)} variants={childVariants} {...rest}>
        {children}
      </Component>
    );
  }
);
MotionStaggerItem.displayName = "MotionStaggerItem";

export { MotionStaggerContainer, MotionStaggerItem };
