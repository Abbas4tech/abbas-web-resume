"use client";

import { useScroll, useSpring, useTransform } from "motion/react";
// biome-ignore lint/performance/noNamespaceImport: required for motion dynamic components
import * as motion from "motion/react-client";
import { memo, useRef } from "react";

export interface MotionScrollProgressProps {
  /** DaisyUI bg color class, default bg-primary */
  colorClass?: string;
  /** Height of the progress line, default 2 */
  lineHeight?: number;
}

/**
 * A vertical scroll-progress indicator that fills downward as the user
 * scrolls the container into view.
 */
const MotionScrollProgress = memo(
  ({
    lineHeight = 2,
    colorClass = "bg-primary",
  }: MotionScrollProgressProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start center", "end center"],
    });

    const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
    const opacity = useTransform(scaleY, [0, 0.05], [0.3, 1]);

    return (
      <div className="relative" ref={ref}>
        {/* track */}
        <div
          className={`absolute top-0 left-0 w-[${lineHeight}px] h-full rounded-full ${colorClass} opacity-10`}
        />
        {/* fill */}
        <motion.div
          className={`absolute top-0 left-0 w-[${lineHeight}px] origin-top rounded-full ${colorClass}`}
          style={{ scaleY, opacity, height: "100%" }}
        />
      </div>
    );
  }
);
MotionScrollProgress.displayName = "MotionScrollProgress";

export { MotionScrollProgress };
