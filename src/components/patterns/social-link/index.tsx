import Image from "next/image";
import Link from "next/link";
import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";
import type { SocialLinkProps } from "./types";

const SocialLink = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & SocialLinkProps>(
    (
      { href, label, iconSrc, iconWidth, iconHeight, className, ...props },
      ref
    ) => (
      <div
        aria-label={label}
        className={cn("tooltip tooltip-bottom", className)}
        data-tip={label}
        ref={ref}
        role="tooltip"
        {...props}
      >
        <Link
          aria-label={`Visit ${label}`}
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt={`${label} icon`}
            className="h-6 w-6 md:h-8 md:w-8"
            height={iconHeight}
            src={iconSrc}
            width={iconWidth}
          />
        </Link>
      </div>
    )
  )
);
SocialLink.displayName = "SocialLink";

export { SocialLink };
