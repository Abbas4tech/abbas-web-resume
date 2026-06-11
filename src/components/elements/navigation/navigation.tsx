"use client";
import type { AosOptions } from "aos";
import AOS from "aos";
import { usePathname } from "next/navigation";
import type { HTMLAttributes } from "react";
import { memo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface NavigationAnimationProps
  extends HTMLAttributes<HTMLDivElement> {
  options: AosOptions;
}

const NavigationAnimation = memo(
  ({ className, options, ...props }: NavigationAnimationProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const _pathname = usePathname();
    useEffect(() => {
      AOS.init({ once: true, ...options });
    }, [options]);
    useEffect(() => {
      containerRef.current?.scrollTo({ behavior: "smooth", top: 0 });
    }, []);

    return <div ref={containerRef} {...props} className={cn("", className)} />;
  }
);
NavigationAnimation.displayName = "NavigationAnimation";

export { NavigationAnimation };
