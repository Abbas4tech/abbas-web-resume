"use client";

import { AnimatePresence, m } from "motion/react";
import { usePathname } from "next/navigation";
import type React from "react";
import { useLayoutEffect } from "react";
import { FrozenRouter } from "@/components/elements/behavior/frozen-router/frozen-router";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const scrollContainer = document.getElementById("main-scroll-container");
    if (scrollContainer) {
      scrollContainer.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      <m.div
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        className="w-full"
        exit={{ opacity: 0, y: -40, scale: 0.98, filter: "blur(8px)" }}
        initial={{ opacity: 0, y: 40, scale: 0.98, filter: "blur(8px)" }}
        key={pathname}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </m.div>
    </AnimatePresence>
  );
}
