import Image from "next/image";
import Link from "next/link";
import { forwardRef, type HTMLAttributes, memo } from "react";
import { MotionHover } from "@/components/elements/behavior/motion-hover/motion-hover";
import { Icon } from "@/components/elements/ui/icon/icon";
import { cn } from "@/lib/utils";

export interface IconLinkProps {
  href: string;
  iconCode?: string;
  iconHeight?: number;
  iconSrc?: string;
  iconWidth?: number;
  label: string;
}

interface IconVisualProps {
  iconCode?: string;
  iconHeight: number;
  iconSrc?: string;
  iconWidth: number;
  label: string;
}

function renderIcon({
  iconSrc,
  iconCode,
  iconWidth,
  iconHeight,
  label,
}: IconVisualProps) {
  const isRealImage =
    !!iconSrc && (iconSrc.startsWith("http") || iconSrc.startsWith("/"));

  if (isRealImage) {
    return (
      <Image
        alt={`${label} icon`}
        className="h-6 w-6 md:h-8 md:w-8"
        height={iconHeight}
        src={iconSrc as string}
        width={iconWidth}
      />
    );
  }

  if (iconCode) {
    return (
      <Icon
        className="h-6 w-6 md:h-8 md:w-8"
        iconCode={iconCode}
        showTooltip={false}
        size="28"
      />
    );
  }

  return (
    <span className="font-semibold text-primary text-sm hover:underline">
      {label}
    </span>
  );
}

const IconLink = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & IconLinkProps>(
    (
      {
        href,
        label,
        iconSrc,
        iconCode,
        iconWidth = 32,
        iconHeight = 32,
        className,
        ...props
      },
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
            {renderIcon({ iconSrc, iconCode, iconWidth, iconHeight, label })}
          </Link>
        </MotionHover>
      </div>
    )
  )
);
IconLink.displayName = "IconLink";

export { IconLink };
