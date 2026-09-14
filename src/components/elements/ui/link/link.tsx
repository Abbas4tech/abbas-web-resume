"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { type AnchorHTMLAttributes, forwardRef, type MouseEvent } from "react";

import { usePageTransition } from "@/hooks/use-page-transition";

export type LinkProps = NextLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    enableTransition?: boolean;
  };

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ onClick, href, enableTransition = true, ...props }, ref) => {
    const { navigateWithTransition } = usePageTransition();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(e);
      }

      if (
        e.defaultPrevented ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        !enableTransition ||
        props.target === "_blank"
      ) {
        return;
      }

      e.preventDefault();
      navigateWithTransition(href.toString());
    };

    return <NextLink href={href} onClick={handleClick} ref={ref} {...props} />;
  }
);
Link.displayName = "Link";
