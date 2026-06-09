import type { HTMLAttributes } from "react";
import type { SocialLinkProps } from "@/components/patterns/social-link/types";

export interface HeroBannerProps extends HTMLAttributes<HTMLDivElement> {
  animation?: string;
  avatarAlt: string;
  avatarHeight: number;
  avatarSrc: string;
  avatarWidth: number;
  bannerImageAlt: string;
  bannerImageHeight: number;
  bannerImageSrc: string;
  bannerImageWidth: number;
  socialLinks: SocialLinkProps[];
}
