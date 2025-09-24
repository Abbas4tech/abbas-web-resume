"use client";
import React, { HTMLAttributes, memo, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import AOS, { AosOptions } from "aos";

import { cn } from "@/lib/utils";

interface NavigationAnimationProps extends HTMLAttributes<HTMLDivElement> {
  options: AosOptions;
}

const NavigationAnimation = memo(
  ({ className, options, ...props }: NavigationAnimationProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const animationKey = useRef(0);
    useEffect(() => {
      AOS.init({
        once: true,
        ...options,
      });
    }, [options]);
    useEffect(() => {
      animationKey.current = animationKey.current + 1;
      containerRef.current?.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }, [pathname]);

    return <div ref={containerRef} {...props} className={cn("", className)} />;
  }
);

NavigationAnimation.displayName = "NavigationAnimation";

export { NavigationAnimation };
