"use client";

import { AnimatePresence } from "motion/react";
// biome-ignore lint/performance/noNamespaceImport: required for motion dynamic components
import * as motion from "motion/react-client";
import { usePathname } from "next/navigation";
import type React from "react";
import { FrozenRouter } from "@/components/elements/frozen-router/frozen-router";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
        exit={{ opacity: 0, y: -30 }}
        initial={{ opacity: 0, y: 30 }}
        key={pathname}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
