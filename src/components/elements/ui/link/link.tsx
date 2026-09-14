"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { type AnchorHTMLAttributes, forwardRef, type MouseEvent } from "react";

export type LinkProps = NextLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    enableTransition?: boolean;
  };

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ onClick, href, enableTransition = true, ...props }, ref) => {
    const router = useRouter();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(e);
      }

      if (
        e.defaultPrevented ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const hrefStr = href.toString();
      const isInternal =
        hrefStr.startsWith("/") || hrefStr.startsWith(window.location.origin);

      if (!isInternal || props.target === "_blank") {
        return;
      }

      if (!enableTransition) {
        return;
      }

      const scrollContainer = document.getElementById("main-scroll-container");

      if (scrollContainer && scrollContainer.scrollTop > 0) {
        e.preventDefault();

        scrollContainer.scrollTo({ top: 0, behavior: "smooth" });

        const start = Date.now();
        const maxWait = 1500;

        const checkScroll = () => {
          if (scrollContainer.scrollTop < 2 || Date.now() - start > maxWait) {
            router.push(hrefStr);
          } else {
            requestAnimationFrame(checkScroll);
          }
        };

        requestAnimationFrame(checkScroll);
      }
    };

    return <NextLink href={href} onClick={handleClick} ref={ref} {...props} />;
  }
);
Link.displayName = "Link";
