"use client";
import React from "react";
import Image from "next/image";
import { useUserInfo } from "../context/useInfo";

const ProfileCard : React.FC = () => {
  const { profilePicture } = useUserInfo();

  return (
    <>
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-32 rounded-full ring ring-offset-2">
          <Image
            src={`https:${profilePicture.file.url}`}
            width={profilePicture.file.details.image.width}
            height={profilePicture.file.details.image.height}
            alt={profilePicture.title}
            priority
          />
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
