import { cn } from "@abbas-web-resume/ui/lib/utils";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { forwardRef, type HTMLAttributes, memo, useMemo } from "react";
import type { Asset } from "@/types/common";
import type { AppData } from "@/types/entries";

const SOCIAL_LINK_IMAGE_CLASS = "w-6 h-6 md:w-8 md:h-8";

type BannerProps = HTMLAttributes<HTMLDivElement> & Pick<AppData, "bannerData">;

const createImageProps = (image: Asset): ImageProps => ({
  src: image.url,
  width: image.width,
  height: image.height,
  alt: image.fileName,
});

const SocialLinkItem = memo(
  forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & {
      link: Asset;
    }
  >(({ link, ...props }, ref) => (
    <div
      aria-label={link.title}
      className="tooltip tooltip-bottom"
      data-tip={link.title}
      ref={ref}
      role="tooltip"
      {...props}
    >
      <Link
        aria-label={`Visit ${link.title}`}
        href={link.description}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Image
          alt={`${link.title} icon`}
          className={SOCIAL_LINK_IMAGE_CLASS}
          height={link.height}
          src={link.url}
          width={link.width}
        />
      </Link>
    </div>
  ))
);

const ProfileBanner = memo(
  forwardRef<HTMLDivElement, BannerProps>(({ className, bannerData, ...props }, ref) => {
    const { bannerAnimation, bannerImage, profilePicture, socialLinksCollection } = bannerData;

    const [firstChunk, secondChunk] = useMemo(() => {
      const middleIndex = Math.ceil(socialLinksCollection.items.length / 2);
      return [
        socialLinksCollection.items.slice(0, middleIndex),
        socialLinksCollection.items.slice(middleIndex),
      ];
    }, [socialLinksCollection]);

    return (
      <div
        className={cn("relative flex flex-col items-center justify-center", className)}
        data-aos={bannerAnimation}
        ref={ref}
        {...props}
      >
        <div className="w-full">
          <Image
            {...createImageProps(bannerImage)}
            alt={bannerImage.title}
            className="h-auto w-full"
            priority
            sizes="(max-width: 768px) 100vw, 75vw"
          />
        </div>

        <div className="avatar mt-[-2rem] md:mt-[-6rem]">
          <div className="w-24 rounded-full ring ring-base-100 ring-offset-2 ring-offset-base-100 md:w-48">
            <Image
              {...createImageProps(profilePicture)}
              alt={profilePicture.title}
              className="rounded-full"
              priority
              sizes="(max-width: 768px) 100vw, 75vw"
            />
          </div>
        </div>

        <div className="mt-[-3rem] flex w-full items-center justify-between pb-4 md:mt-[-5rem] md:pb-12">
          <div className="flex gap-4" data-aos="fade-right">
            {firstChunk.map((link) => (
              <SocialLinkItem key={link.title} link={link} />
            ))}
          </div>

          <div className="flex gap-4" data-aos="fade-left">
            {secondChunk.map((link) => (
              <SocialLinkItem key={link.title} link={link} />
            ))}
          </div>
        </div>
      </div>
    );
  })
);

ProfileBanner.displayName = "ProfileCard";

export { ProfileBanner };
export type { BannerProps };
