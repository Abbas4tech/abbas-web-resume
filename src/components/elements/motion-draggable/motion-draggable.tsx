"use client";

// biome-ignore lint/performance/noNamespaceImport: required for motion dynamic components
import * as motion from "motion/react-client";
import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MotionDraggableProps {
  as?: "div" | "span" | "li" | "section";
  children: ReactNode;
  className?: string;
}

const MotionDraggable = memo(
  ({ children, className, as = "div" }: MotionDraggableProps) => {
    // biome-ignore lint/suspicious/noExplicitAny: dynamic assignment
    const Component = (motion as any)[as];

    return (
      <Component
        className={cn("cursor-grab active:cursor-grabbing", className)}
        drag
        dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
        dragElastic={0.2}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        whileDrag={{ scale: 1.05 }}
        whileHover={{ scale: 1.02 }}
      >
        {children}
      </Component>
    );
  }
);
MotionDraggable.displayName = "MotionDraggable";

export { MotionDraggable };
