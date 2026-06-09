import Image from "next/image";
import { forwardRef, memo, useMemo } from "react";
import { SocialLink } from "@/components/patterns/social-link";
import { cn } from "@/lib/utils";
import type { HeroBannerProps } from "./types";

const HeroBanner = memo(
  forwardRef<HTMLDivElement, HeroBannerProps>(
    (
      {
        className,
        bannerImageSrc,
        bannerImageAlt,
        bannerImageWidth,
        bannerImageHeight,
        avatarSrc,
        avatarAlt,
        avatarWidth,
        avatarHeight,
        animation,
        socialLinks,
        ...props
      },
      ref
    ) => {
      const [firstChunk, secondChunk] = useMemo(() => {
        const mid = Math.ceil(socialLinks.length / 2);
        return [socialLinks.slice(0, mid), socialLinks.slice(mid)];
      }, [socialLinks]);

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
          <div className="w-full">
            <Image
              alt={bannerImageAlt}
              className="h-auto w-full"
              height={bannerImageHeight}
              priority
              sizes="(max-width: 768px) 100vw, 75vw"
              src={bannerImageSrc}
              width={bannerImageWidth}
            />
          </div>

          <div className="avatar mt-[-2rem] md:mt-[-6rem]">
            <div className="w-24 rounded-full ring ring-base-100 ring-offset-2 ring-offset-base-100 md:w-48">
              <Image
                alt={avatarAlt}
                className="rounded-full"
                height={avatarHeight}
                priority
                sizes="(max-width: 768px) 100vw, 75vw"
                src={avatarSrc}
                width={avatarWidth}
              />
            </div>
          </div>

          <div className="mt-[-3rem] flex w-full items-center justify-between pb-4 md:mt-[-5rem] md:pb-12">
            <div className="flex gap-4" data-aos="fade-right">
              {firstChunk.map((link) => (
                <SocialLink key={link.label} {...link} />
              ))}
            </div>
            <div className="flex gap-4" data-aos="fade-left">
              {secondChunk.map((link) => (
                <SocialLink key={link.label} {...link} />
              ))}
            </div>
          </div>
        </div>
      );
    }
  )
);
HeroBanner.displayName = "HeroBanner";

export { HeroBanner };
