"use client";

// biome-ignore lint/performance/noNamespaceImport: required for motion dynamic components
import * as motion from "motion/react-client";
import { forwardRef, type HTMLAttributes, memo, type ReactNode } from "react";
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
      mass: 0.8,
    },
  },
};

export interface MotionStaggerContainerProps
  extends HTMLAttributes<HTMLElement> {
  as?: "div" | "ul" | "ol" | "section";
  children: ReactNode;
  className?: string;
  once?: boolean;
}

/** Wraps a list/grid and stagger-animates each direct MotionStaggerItem child. */
const MotionStaggerContainer = memo(
  forwardRef<HTMLElement, MotionStaggerContainerProps>(
    ({ children, className, as = "div", once = true, ...rest }, ref) => {
      // biome-ignore lint/suspicious/noExplicitAny: dynamic assignment
      const Component = (motion as any)[as];

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

export interface MotionStaggerItemProps {
  as?: "div" | "li" | "span" | "article";
  children: ReactNode;
  className?: string;
}

/** Each child inside a MotionStaggerContainer. Animates in orchestrated sequence. */
const MotionStaggerItem = memo(
  ({ children, className, as = "div" }: MotionStaggerItemProps) => {
    // biome-ignore lint/suspicious/noExplicitAny: dynamic assignment
    const Component = (motion as any)[as];
    return (
      <Component className={cn(className)} variants={childVariants}>
        {children}
      </Component>
    );
  }
);
MotionStaggerItem.displayName = "MotionStaggerItem";

export { MotionStaggerContainer, MotionStaggerItem };
