"use client";
import React, { memo } from "react";
import Image from "next/image";
import { useApplicationData } from "@context";
import Link from "next/link";

const ProfileCard = memo(() => {
  const {
    bannerData: { bannerImage, profilePicture, socialLinks, bannerAnimation },
  } = useApplicationData();
  const middleIndex = Math.ceil(socialLinks.length / 2);
  const firstChunk = socialLinks.slice(0, middleIndex);
  const secondChunk = socialLinks.slice(middleIndex);

  return (
    <div
      data-aos={bannerAnimation}
      className="flex flex-col justify-center items-center relative"
    >
      <div>
        <Image
          src={`https:${bannerImage.file.url}`}
          width={bannerImage.file.details.image.width}
          height={bannerImage.file.details.image.height}
          alt={bannerImage.title}
        />
      </div>
      <div className="avatar mt-[-2rem] md:mt-[-6rem]">
        <div className="ring-base-100 ring-offset-base-100 w-24 md:w-48 rounded-full ring ring-offset-2">
          <Image
            src={`https:${profilePicture.file.url}`}
            width={profilePicture.file.details.image.width}
            height={profilePicture.file.details.image.height}
            alt={profilePicture.title}
          />
        </div>
      </div>

      <div className="flex justify-between items-center w-full pb-4 md:pb-12 mt-[-3rem] md:mt-[-5rem]">
        <div data-aos="fade-right" className="flex gap-4">
          {firstChunk.map((link) => (
            <div
              key={link.title}
              data-tip={link.title}
              className="tooltip tooltip-bottom"
            >
              <Link target="_blank" href={link.description}>
                <Image
                  src={`https:${link.file.url}`}
                  width={link.file.details.image.width}
                  height={link.file.details.image.height}
                  alt={link.title}
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </Link>
            </div>
          ))}
        </div>

        <div data-aos="fade-left" className="flex gap-4">
          {secondChunk.map((link) => (
            <div
              key={link.title}
              data-tip={link.title}
              className="tooltip tooltip-bottom"
            >
              <Link target="_blank" href={link.description}>
                <Image
                  src={`https:${link.file.url}`}
                  width={link.file.details.image.width}
                  height={link.file.details.image.height}
                  alt={link.title}
                  className="w-6 h-6 md:w-8 md:h-8"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
