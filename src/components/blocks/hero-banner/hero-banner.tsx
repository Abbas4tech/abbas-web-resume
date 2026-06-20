import type { HTMLAttributes } from "react";
import { forwardRef, memo, useMemo } from "react";
import { Image as ContentfulImage } from "@/components/contentful/image";
import type { IconLinkProps } from "@/components/patterns/icon-link/icon-link";
import { IconLink } from "@/components/patterns/icon-link/icon-link";
import type { AdaptedImage } from "@/contentful/adapters/image";
import { cn } from "@/lib/utils";

export interface HeroBannerProps extends HTMLAttributes<HTMLDivElement> {
  animation?: string;
  avatarImage: AdaptedImage | null;
  bannerImage: AdaptedImage | null;
  iconLinks: IconLinkProps[];
}

const HeroBanner = memo(
  forwardRef<HTMLDivElement, HeroBannerProps>(
    (
      { className, bannerImage, avatarImage, animation, iconLinks, ...props },
      ref
    ) => {
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
          data-aos={animation}
          ref={ref}
          {...props}
        >
          {bannerImage && (
            <div className="w-full">
              <ContentfulImage
                className="h-auto w-full"
                data={bannerImage}
                priority
              />
            </div>
          )}

          {avatarImage && (
            <div className="avatar mt-[-2rem] md:mt-[-6rem]">
              <div className="w-24 rounded-full ring ring-base-100 ring-offset-2 ring-offset-base-100 md:w-48">
                <ContentfulImage
                  className="rounded-full"
                  data={avatarImage}
                  priority
                />
              </div>
            </div>
          )}

          {iconLinks.length && (
            <div className="mt-[-3rem] flex w-full items-center justify-between pb-4 md:mt-[-5rem] md:pb-12">
              <div className="flex gap-4" data-aos="fade-right">
                {firstChunk.map((link) => (
                  <IconLink key={link.label} {...link} />
                ))}
              </div>
              <div className="flex gap-4" data-aos="fade-left">
                {secondChunk.map((link) => (
                  <IconLink key={link.label} {...link} />
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
  )
);
HeroBanner.displayName = "HeroBanner";

export { HeroBanner };
