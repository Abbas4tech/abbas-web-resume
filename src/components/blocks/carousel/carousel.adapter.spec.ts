import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { adaptCarousel } from "./carousel.adapter";

describe("adaptCarousel", () => {
  it("adapts generic ContentList to CarouselProps, sourcing coverImage", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          id: "slide-1",
          title: "Slide One",
          description: "A subtitle",
          links: [{ href: "https://example.com/slide" }],
          image: {
            url: "/thumbnail.jpg",
            title: "Thumbnail — should not be used",
            width: 100,
            height: 100,
          },
          coverImage: {
            url: "/cover.jpg",
            title: "Cover art",
            alternativeText: "A wide cover image",
            width: 1600,
            height: 500,
          },
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptCarousel(input);

    expect(result.slides).toHaveLength(1);
    expect(result.slides[0]).toEqual({
      id: "slide-1",
      title: "Slide One",
      description: "A subtitle",
      links: [{ href: "https://example.com/slide" }],
      imageAlt: "A wide cover image",
      imageSrc: "/cover.jpg",
      imageWidth: 1600,
      imageHeight: 500,
    });
  });

  it("handles missing optional fields", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Minimal Slide",
        },
      ],
    } as AdaptedContentList;

    const result = adaptCarousel(input);
    expect(result.slides[0].description).toBeUndefined();
    expect(result.slides[0].imageSrc).toBe("");
    expect(result.slides[0].imageAlt).toBe("");
  });
});
