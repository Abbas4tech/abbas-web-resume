"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AOS, { AosOptions } from "aos";
import { cn } from "@lib/utils";

const NavigationAnimation = React.memo(
  React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
      options: AosOptions;
    }
  >(({ className, options, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [animationKey, setAnimationKey] = useState(0);
    useEffect(() => {
      AOS.init({
        once: true,
        ...options,
      });
    }, [options]);
    useEffect(() => {
      setAnimationKey((prev) => prev + 1);
      containerRef.current?.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }, [pathname]);

    return <div ref={containerRef} {...props} className={cn("", className)} />;
  })
);

export default NavigationAnimation;
