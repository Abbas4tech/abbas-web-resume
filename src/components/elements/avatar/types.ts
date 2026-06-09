import type { HTMLAttributes } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg";
export type AvatarRounded = "full" | "xl" | "lg" | "md" | "sm" | "none";

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  ring?: string;
  size?: AvatarSize;
};

export type AvatarImageProps = HTMLAttributes<HTMLDivElement> & {
  src: string;
  alt: string;
  width: number;
  height: number;
  rounded?: AvatarRounded;
};
