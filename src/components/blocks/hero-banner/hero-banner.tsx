import type { HTMLAttributes } from "react";
import { forwardRef, memo, useMemo } from "react";
import { Image as ContentfulImage } from "@/components/contentful/image";
import { MotionParallax } from "@/components/elements/behavior/motion-parallax/motion-parallax";
import { MotionWrapper } from "@/components/elements/behavior/motion-wrapper/motion-wrapper";
import type { IconLinkProps } from "@/components/patterns/icon-link/icon-link";
import { IconLink } from "@/components/patterns/icon-link/icon-link";
import type { AdaptedImage } from "@/contentful/adapters/image";
import { cn } from "@/lib/utils";

export interface HeroBannerProps extends HTMLAttributes<HTMLDivElement> {
  avatarImage: AdaptedImage | null;
  bannerImage: AdaptedImage | null;
  iconLinks: IconLinkProps[];
}

const HeroBanner = memo(
  forwardRef<HTMLDivElement, HeroBannerProps>(
    ({ className, bannerImage, avatarImage, iconLinks, ...props }, ref) => {
      const [firstChunk, secondChunk] = useMemo(() => {
        const mid = Math.ceil(iconLinks.length / 2);
        return [iconLinks.slice(0, mid), iconLinks.slice(mid)];
      }, [iconLinks]);

      return (
        <div
          className={cn(
            "relative flex flex-col items-center justify-center",
            className
          )}
          ref={ref}
          {...props}
        >
          {bannerImage && (
            <MotionParallax
              className="relative h-[25vh] max-h-[360px] min-h-[200px] w-full overflow-hidden md:h-[35vh]"
              speed={0.3}
            >
              <ContentfulImage
                className="pointer-events-none mt-[-15%] h-[130%] w-full select-none object-cover"
                data={bannerImage}
                priority
              />
            </MotionParallax>
          )}

          {avatarImage && (
            <MotionWrapper
              animation="zoom-in"
              className="avatar -mt-8 md:-mt-24"
              delay={0.2}
            >
              <div className="w-24 rounded-full ring ring-base-100 ring-offset-2 ring-offset-base-100 md:w-48">
                <ContentfulImage
                  className="rounded-full"
                  data={avatarImage}
                  priority
                />
              </div>
            </MotionWrapper>
          )}

          {iconLinks.length && (
            <MotionWrapper
              animation="fade-up"
              className="-mt-12 flex w-full items-center justify-between pb-4 md:-mt-20 md:pb-12"
              delay={0.4}
            >
              <div className="flex gap-4">
                {firstChunk.map((link) => (
                  <IconLink key={link.label} {...link} />
                ))}
              </div>
              <div className="flex gap-4">
                {secondChunk.map((link) => (
                  <IconLink key={link.label} {...link} />
                ))}
              </div>
            </MotionWrapper>
          )}
        </div>
      );
    }
  )
);
HeroBanner.displayName = "HeroBanner";

export { HeroBanner };
