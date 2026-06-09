import React from "react";
import { AvatarImage } from "./index";
import type { AvatarImageProps, AvatarProps } from "./types";

export const baseMock: AvatarProps = {
  size: "md",
  children: React.createElement(AvatarImage, {
    src: "https://placehold.co/128x128/png",
    alt: "User avatar",
    width: 128,
    height: 128,
    rounded: "full",
  } as AvatarImageProps),
};
