"use client";
import React, { memo } from "react";
import Image from "next/image";
import { useApplicationData } from "@context";

const ProfileCard = memo(() => {
  const { profilePicture } = useApplicationData();
  return (
    <>
      <div data-aos="flip-up" className="flex my-6 justify-center items-center">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 md:w-48 rounded-full ring ring-offset-2">
            <Image
              src={`https:${profilePicture.file.url}`}
              width={profilePicture.file.details.image.width}
              height={profilePicture.file.details.image.height}
              alt={profilePicture.title}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
});

ProfileCard.displayName = "ProfileCard";

export default ProfileCard;
