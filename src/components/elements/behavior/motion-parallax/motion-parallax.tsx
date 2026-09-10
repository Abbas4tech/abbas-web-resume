"use client";

import { m, useScroll, useSpring, useTransform } from "motion/react";
import { memo, type ReactNode, useEffect, useRef, useState } from "react";

export interface MotionParallaxProps {
  children: ReactNode;
  className?: string;
  /** Speed factor: 0 = no parallax, 1 = full scroll (like fixed). Default 0.3 */
  speed?: number;
}

interface MotionParallaxInnerProps {
  children: ReactNode;
  className?: string;
  container: HTMLElement;
  speed: number;
}

const MotionParallaxInner = memo(
  ({ children, className, speed, container }: MotionParallaxInnerProps) => {
    const containerRef = useRef<HTMLElement>(container);
    containerRef.current = container;

    const { scrollY } = useScroll({
      container: containerRef,
    });

    // Translate the image vertically as the container scrolls.
    // For 400px of scroll, translate the image down by speed * 200px.
    const rawY = useTransform(scrollY, [0, 400], ["0px", `${speed * 200}px`]);
    const y = useSpring(rawY, { stiffness: 80, damping: 20 });

    return (
      <div className={className} style={{ overflow: "hidden" }}>
        <m.div className="relative h-full will-change-transform" style={{ y }}>
          {children}
        </m.div>
      </div>
    );
  }
);
MotionParallaxInner.displayName = "MotionParallaxInner";

const MotionParallax = memo(
  ({ children, speed = 0.3, className }: MotionParallaxProps) => {
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
        <div
          className={className}
          ref={placeholderRef}
          style={{ overflow: "hidden" }}
        >
          <div className="relative h-full">{children}</div>
        </div>
      );
    }

    return (
      <MotionParallaxInner
        className={className}
        container={container}
        speed={speed}
      >
        {children}
      </MotionParallaxInner>
    );
  }
);
MotionParallax.displayName = "MotionParallax";

export { MotionParallax };
