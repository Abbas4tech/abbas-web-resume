"use client";
import React from "react";
import Image from "next/image";
import { useUserInfo } from "../context/useInfo";

const ProfileCard = () => {
  const { profilePic } = useUserInfo();

  return (
    <>
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-32 rounded-full ring ring-offset-2">
          {/* <Image
            src={`https://placehold.co/600x400`}
            width={100}
            height={100}
            alt="profile-pic"
            priority
          /> */}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
