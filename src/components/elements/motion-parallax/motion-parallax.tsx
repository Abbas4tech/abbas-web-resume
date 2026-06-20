"use client";

import { useScroll, useSpring, useTransform } from "motion/react";
// biome-ignore lint/performance/noNamespaceImport: required for motion dynamic components
import * as motion from "motion/react-client";
import { memo, type ReactNode, useRef } from "react";

export interface MotionParallaxProps {
  children: ReactNode;
  className?: string;
  /** Speed factor: 0 = no parallax, 1 = full scroll (like fixed). Default 0.3 */
  speed?: number;
}

/**
 * Wraps children in a parallax container.
 * The inner content moves at a fraction of the scroll speed, creating depth.
 */
const MotionParallax = memo(
  ({ children, speed = 0.3, className }: MotionParallaxProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"],
    });

    // Transform scroll progress [0,1] into a vertical translate
    const rawY = useTransform(
      scrollYProgress,
      [0, 1],
      ["0%", `${speed * 60}%`]
    );
    const y = useSpring(rawY, { stiffness: 80, damping: 20 });

    return (
      <div className={className} ref={ref} style={{ overflow: "hidden" }}>
        <motion.div className="will-change-transform" style={{ y }}>
          {children}
        </motion.div>
      </div>
    );
  }
);
MotionParallax.displayName = "MotionParallax";

export { MotionParallax };
