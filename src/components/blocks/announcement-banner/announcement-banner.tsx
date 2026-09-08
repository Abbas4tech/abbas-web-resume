"use client";

import { m, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { MotionWrapper } from "@/components/elements/behavior/motion-wrapper/motion-wrapper";
import type { AlertVariant } from "@/components/elements/ui/alert/alert";
import { Alert } from "@/components/elements/ui/alert/alert";
import type { IconProps } from "@/components/elements/ui/icon/icon";
import { Icon } from "@/components/elements/ui/icon/icon";
import type { AdaptedLink } from "@/contentful/adapters/link";
import { cn } from "@/lib/utils";

export interface AnnouncementBannerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: IconProps;
  link?: AdaptedLink;
  message: string;
  variant?: AlertVariant;
}

const AnnouncementBanner = memo(
  forwardRef<HTMLDivElement, AnnouncementBannerProps>(
    ({ className, message, variant = "info", icon, link, ...props }, ref) => {
      const prefersReducedMotion = useReducedMotion();

      return (
        <MotionWrapper animation="slide-right" as="div">
          <Alert
            className={cn(
              "items-center justify-between gap-4 transition-colors duration-300",
              className
            )}
            ref={ref}
            variant={variant}
            {...props}
          >
            <span className="flex items-center gap-3">
              {icon && (
                <m.span
                  animate={
                    prefersReducedMotion ? undefined : { scale: [1, 1.15, 1] }
                  }
                  className="inline-flex"
                  transition={{
                    duration: 1.8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Icon {...icon} showTooltip={false} />
                </m.span>
              )}
              {message}
            </span>
            {link?.href && (
              <a
                className="link link-hover font-semibold transition-opacity duration-200 hover:opacity-80"
                href={link.href}
              >
                {link.text}
              </a>
            )}
          </Alert>
        </MotionWrapper>
      );
    }
  )
);
AnnouncementBanner.displayName = "AnnouncementBanner";

export { AnnouncementBanner };
