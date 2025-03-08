"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AOS, { AosOptions } from "aos";
import "aos/dist/aos.css";

const NavigationAnimation = React.memo(
  React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
      options: AosOptions;
    }
  >(({ className, options, ...props }, ref) => {
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
      AOS.refresh();
    }, [pathname]);

    return (
      <div
        ref={ref}
        key={animationKey}
        data-aos="fade-down"
        {...props}
        className="z-50 bg-black text-white p-4 text-center"
      >
        Navigating...
      </div>
    );
  })
);

export default NavigationAnimation;
