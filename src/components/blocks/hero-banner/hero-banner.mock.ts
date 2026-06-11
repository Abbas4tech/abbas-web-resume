import type { HeroBannerProps } from "./hero-banner";

export const baseMock: HeroBannerProps = {
  animation: "fade-down",
  avatarAlt: "Abbas Avatar",
  avatarHeight: 150,
  avatarWidth: 150,
  avatarSrc: "https://placehold.co/150x150/png",
  bannerImageAlt: "Coding setup",
  bannerImageHeight: 400,
  bannerImageWidth: 1200,
  bannerImageSrc: "https://placehold.co/1200x400/png",
  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com",
      iconSrc: "https://placehold.co/24x24/png",
      iconHeight: 24,
      iconWidth: 24,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      iconSrc: "https://placehold.co/24x24/png",
      iconHeight: 24,
      iconWidth: 24,
    },
    {
      label: "Twitter",
      href: "https://twitter.com",
      iconSrc: "https://placehold.co/24x24/png",
      iconHeight: 24,
      iconWidth: 24,
    },
  ],
};
