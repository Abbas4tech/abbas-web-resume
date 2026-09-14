"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

export function InitialLoadAnimation({ children }: { children: ReactNode }) {
  return (
    <m.div
      animate={{ filter: "grayscale(0%)" }}
      initial={{ filter: "grayscale(100%)" }}
      transition={{ delay: 3, duration: 3, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
