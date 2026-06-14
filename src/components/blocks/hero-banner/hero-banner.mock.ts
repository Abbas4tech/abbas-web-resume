import type { HeroBannerProps } from "./hero-banner";

export const baseMock: HeroBannerProps = {
  animation: "fade-down",
  bannerImage: {
    __typename: "Image",
    id: "banner-1",
    internalName: "Coding setup",
    alternativeText: "Coding setup",
    url: "https://placehold.co/1200x400/png",
    title: "",
    description: "",
    width: 1200,
    height: 400,
    caption: "",
  },
  avatarImage: {
    __typename: "Image",
    id: "avatar-1",
    internalName: "Abbas Avatar",
    alternativeText: "Abbas Avatar",
    url: "https://placehold.co/150x150/png",
    title: "",
    description: "",
    width: 150,
    height: 150,
    caption: "",
  },
  iconLinks: [
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
