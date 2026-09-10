import type { MockupGalleryProps } from "./mockup-gallery";

export const baseMock: MockupGalleryProps = {
  frame: "browser",
  items: [
    {
      id: "item-fixture-dashboard",
      title: "Fixture Dashboard",
      description: "An analytics dashboard built to stress-test the block.",
      imageAlt: "Fixture Dashboard screenshot",
      imageSrc: "/fixtures/hero-banner.png",
      imageWidth: 1600,
      imageHeight: 500,
    },
    {
      id: "item-mock-market",
      title: "Mock Market",
      description: "A synthetic storefront used to exercise checkout flows.",
      imageAlt: "Mock Market screenshot",
      imageSrc: "/fixtures/hero-banner.png",
      imageWidth: 1600,
      imageHeight: 500,
    },
  ],
};

export const phoneMock: MockupGalleryProps = {
  ...baseMock,
  frame: "phone",
};
