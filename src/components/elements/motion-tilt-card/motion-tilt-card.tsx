"use client";

import {
  m,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { type MouseEvent, memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MotionTiltCardProps {
  children: ReactNode;
  className?: string;
}

const MotionTiltCard = memo(({ children, className }: MotionTiltCardProps) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth the mouse movement
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Map 0-1 values to rotation degrees (-10 to 10)
  const rotateX = useTransform(springY, [0, 1], [10, -10]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);

  // Lighting effect
  const glareOpacity = useTransform(springY, [0, 1], [0.1, 0.3]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${useTransform(springX, (v) => v * 100)}% ${useTransform(springY, (v) => v * 100)}%, rgba(255,255,255,${glareOpacity}), transparent 80%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <m.div
      className={cn("group perspective-1000 relative", className)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glare effect overlay */}
      <m.div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glareBackground }}
      />
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </m.div>
  );
});
MotionTiltCard.displayName = "MotionTiltCard";

export { MotionTiltCard };
