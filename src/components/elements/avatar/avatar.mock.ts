import React from "react";
import type { AvatarImageProps, AvatarProps } from "./avatar";
import { AvatarImage } from "./avatar";

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
