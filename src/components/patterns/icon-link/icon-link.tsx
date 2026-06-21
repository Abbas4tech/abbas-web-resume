import Image from "next/image";
import Link from "next/link";
import { forwardRef, type HTMLAttributes, memo } from "react";
import { MotionHover } from "@/components/elements/behavior/motion-hover/motion-hover";
import { cn } from "@/lib/utils";

export interface IconLinkProps {
  href: string;
  iconHeight: number;
  iconSrc: string;
  iconWidth: number;
  label: string;
}

const IconLink = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & IconLinkProps>(
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
        <MotionHover rotate={5} scale={1.1} tapScale={0.95}>
          <Link
            aria-label={`Visit ${label}`}
            className="block"
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {iconSrc ? (
              <Image
                alt={`${label} icon`}
                className="h-6 w-6 md:h-8 md:w-8"
                height={iconHeight}
                src={iconSrc}
                width={iconWidth}
              />
            ) : (
              <span className="font-semibold text-primary text-sm hover:underline">
                {label}
              </span>
            )}
          </Link>
        </MotionHover>
      </div>
    )
  )
);
IconLink.displayName = "IconLink";

export { IconLink };
