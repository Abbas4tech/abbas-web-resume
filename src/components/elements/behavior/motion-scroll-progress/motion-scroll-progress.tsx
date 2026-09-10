"use client";

import { m, useScroll, useSpring, useTransform } from "motion/react";
import { memo, useEffect, useRef, useState } from "react";

export interface MotionScrollProgressProps {
  /** DaisyUI bg color class, default bg-primary */
  colorClass?: string;
  /** Height of the progress line, default 2 */
  lineHeight?: number;
}

interface MotionScrollProgressInnerProps {
  colorClass: string;
  container: HTMLElement;
  lineHeight: number;
}

const MotionScrollProgressInner = memo(
  ({ colorClass, container, lineHeight }: MotionScrollProgressInnerProps) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLElement>(container);
    containerRef.current = container;

    const { scrollYProgress } = useScroll({
      target: targetRef,
      container: containerRef,
      offset: ["start center", "end center"],
    });

    const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
    const opacity = useTransform(scaleY, [0, 0.05], [0.3, 1]);

    return (
      <div className="relative" ref={targetRef}>
        {/* track */}
        <div
          className={`absolute top-0 left-0 w-[${lineHeight}px] h-full rounded-full ${colorClass} opacity-10`}
        />
        {/* fill */}
        <m.div
          className={`absolute top-0 left-0 w-[${lineHeight}px] origin-top rounded-full ${colorClass}`}
          style={{ scaleY, opacity, height: "100%" }}
        />
      </div>
    );
  }
);
MotionScrollProgressInner.displayName = "MotionScrollProgressInner";

const MotionScrollProgress = memo(
  ({
    lineHeight = 2,
    colorClass = "bg-primary",
  }: MotionScrollProgressProps) => {
    const [container, setContainer] = useState<HTMLElement | null>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (placeholderRef.current) {
        const found =
          (document.querySelector(
            ".drawer-content > .overflow-auto"
          ) as HTMLElement) ||
          (placeholderRef.current.closest(".overflow-auto") as HTMLElement) ||
          (placeholderRef.current.closest(".drawer-content") as HTMLElement) ||
          document.body;
        setContainer(found);
      }
    }, []);

    if (!container) {
      return (
        <div className="relative" ref={placeholderRef}>
          {/* track */}
          <div
            className={`absolute top-0 left-0 w-[${lineHeight}px] h-full rounded-full ${colorClass} opacity-10`}
          />
        </div>
      );
    }

    return (
      <MotionScrollProgressInner
        colorClass={colorClass}
        container={container}
        lineHeight={lineHeight}
      />
    );
  }
);
MotionScrollProgress.displayName = "MotionScrollProgress";

export { MotionScrollProgress };
