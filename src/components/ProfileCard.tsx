"use client";
import React, { memo } from "react";
import Image from "next/image";
import { useApplicationData } from "@context";
import Link from "next/link";

const ProfileCard = memo(() => {
  console.log(useApplicationData().bannerData);
  const {
    bannerData: {
      bannerImage,
      profilePicture,
      socialLinks,
      bannerAnimation,
      title,
    },
  } = useApplicationData();

  return (
    <>
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
        <div className="avatar mt-[-2rem] sm:mt-[-6rem]">
          <div className="ring-base-100 ring-offset-base-100 w-24 md:w-48 rounded-full ring ring-offset-2">
            <Image
              src={`https:${profilePicture.file.url}`}
              width={profilePicture.file.details.image.width}
              height={profilePicture.file.details.image.height}
              alt={profilePicture.title}
            />
          </div>
        </div>

        <div className="flex gap-4">
          {socialLinks.map((link) => (
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
    </>
  );
});

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
