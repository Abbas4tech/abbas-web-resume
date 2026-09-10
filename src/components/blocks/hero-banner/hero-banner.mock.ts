import type { HeroBannerProps } from "./hero-banner";

export const baseMock: HeroBannerProps = {
  bannerImage: {
    __typename: "Image",
    id: "banner-1",
    internalName: "Coding setup",
    alternativeText: "Coding setup",
    url: "https://picsum.photos/seed/hero-banner-workspace/1200/400",
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
    url: "https://picsum.photos/seed/hero-banner-avatar/300/300",
    title: "",
    description: "",
    width: 150,
    height: 150,
    caption: "",
  },
  // Real brand icons from the curated registry (see icon-map.ts) render
  // through IconLink's `iconCode` path, so no iconSrc/placeholder image
  // is needed here.
  iconLinks: [
    {
      label: "GitHub",
      href: "https://github.com",
      iconCode: "fa/FaGithub",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      iconCode: "fa/FaLinkedin",
    },
    {
      label: "Twitter",
      href: "https://twitter.com",
      iconCode: "fa6/FaXTwitter",
    },
  ],
};
