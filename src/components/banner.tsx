import React from "react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { ApplicationData, FileAsset } from "@lib/contentful";
import { cn } from "@lib/utils";

const SOCIAL_LINK_IMAGE_CLASS = "w-6 h-6 md:w-8 md:h-8";

type BannerProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<ApplicationData, "bannerData">;

const createImageProps = (image: FileAsset): ImageProps => ({
  src: image.file.url.startsWith("https:")
    ? image.file.url
    : `https:${image.file.url}`,
  width: image.file.details.image.width,
  height: image.file.details.image.height,
  alt: image.title,
});

const SocialLinkItem = React.memo(
  React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
      link: FileAsset;
    }
  >(({ className, link, ...props }, ref) => (
    <div
      ref={ref}
      data-tip={link.title}
      className="tooltip tooltip-bottom"
      role="tooltip"
      aria-label={link.title}
      {...props}
    >
      <Link
        href={link.description}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${link.title}`}
      >
        <Image
          src={
            link.file.url.startsWith("https:")
              ? link.file.url
              : `https:${link.file.url}`
          }
          width={link.file.details.image.width}
          height={link.file.details.image.height}
          alt={`${link.title} icon`}
          className={SOCIAL_LINK_IMAGE_CLASS}
        />
      </Link>
    </div>
  ))
);

const ProfileBanner = React.memo(
  React.forwardRef<HTMLDivElement, BannerProps>(
    ({ className, bannerData, ...props }, ref) => {
      const {
        bannerAnimation,
        bannerImage,
        profilePicture,
        title,
        socialLinks,
      } = bannerData;

      const [firstChunk, secondChunk] = React.useMemo(() => {
        const middleIndex = Math.ceil(socialLinks.length / 2);
        return [
          socialLinks.slice(0, middleIndex),
          socialLinks.slice(middleIndex),
        ];
      }, [socialLinks]);

      return (
        <div
          ref={ref}
          data-aos={bannerAnimation}
          className={cn(
            "flex flex-col justify-center items-center relative",
            className
          )}
          {...props}
        >
          <div className="w-full">
            <Image
              {...createImageProps(bannerImage)}
              className="w-full h-auto"
              alt={bannerImage.title}
              priority
              sizes="(max-width: 768px) 100vw, 75vw"
            />
          </div>

          <div className="avatar mt-[-2rem] md:mt-[-6rem]">
            <div className="ring-base-100 ring-offset-base-100 w-24 md:w-48 rounded-full ring ring-offset-2">
              <Image
                {...createImageProps(profilePicture)}
                className="rounded-full"
                alt={profilePicture.title}
                priority
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </div>
          </div>

          <div className="flex justify-between items-center w-full pb-4 md:pb-12 mt-[-3rem] md:mt-[-5rem]">
            <div data-aos="fade-right" className="flex gap-4">
              {firstChunk.map((link) => (
                <SocialLinkItem key={link.title} link={link} />
              ))}
            </div>

            <div data-aos="fade-left" className="flex gap-4">
              {secondChunk.map((link) => (
                <SocialLinkItem key={link.title} link={link} />
              ))}
            </div>
          </div>
        </div>
      );
    }
  )
);

ProfileBanner.displayName = "ProfileCard";

export { ProfileBanner };
export type { BannerProps };
