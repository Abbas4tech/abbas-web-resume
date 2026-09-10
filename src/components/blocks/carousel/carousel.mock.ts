import type { CarouselProps } from "./carousel";

export const baseMock: CarouselProps = {
  slides: [
    {
      id: "slide-launch",
      title: "Product Launch",
      description: "Shipping the redesigned dashboard to production.",
      imageAlt: "Wide banner artwork for the product launch",
      imageSrc: "/fixtures/hero-banner.png",
      imageWidth: 1600,
      imageHeight: 500,
      links: [
        {
          __typename: "Link",
          id: "link-launch",
          internalName: "View launch",
          text: "View case study",
          href: "https://example.com/launch",
          icon: undefined,
        },
      ],
    },
    {
      id: "slide-design-system",
      title: "Design System",
      description: "A shared component library across three product teams.",
      imageAlt: "Wide banner artwork for the design system",
      imageSrc: "/fixtures/hero-banner.png",
      imageWidth: 1600,
      imageHeight: 500,
    },
    {
      id: "slide-mobile-app",
      title: "Mobile App",
      description: "A cross-platform companion app built with React Native.",
      imageAlt: "Wide banner artwork for the mobile app",
      imageSrc: "/fixtures/hero-banner.png",
      imageWidth: 1600,
      imageHeight: 500,
    },
  ],
};
