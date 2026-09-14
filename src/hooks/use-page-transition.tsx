"use client";
import { animate } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function usePageTransition() {
  const router = useRouter();

  const navigateWithTransition = useCallback(
    (href: string) => {
      const hrefStr = href.toString();
      const isInternal =
        hrefStr.startsWith("/") || hrefStr.startsWith(window.location.origin);

      if (!isInternal) {
        window.open(hrefStr, "_blank");
        return;
      }

      const scrollContainer = document.getElementById("main-scroll-container");

      if (scrollContainer && scrollContainer.scrollTop > 0) {
        animate(scrollContainer.scrollTop, 0, {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (latest: number) => {
            scrollContainer.scrollTop = latest;
          },
          onComplete: () => {
            router.push(hrefStr);
          },
        });
      } else {
        router.push(hrefStr);
      }
    },
    [router]
  );

  return { navigateWithTransition };
}
