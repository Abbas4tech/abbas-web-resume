import { describe, expect, it } from "vitest";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import type { AdaptedImage } from "@/contentful/adapters/image";
import { adaptHeroBanner } from "./hero-banner.adapter";

describe("adaptHeroBanner", () => {
  it("adapts ContentSection to HeroBannerProps", () => {
    const mockImage: AdaptedImage = {
      __typename: "Image",
      id: "img-1",
      internalName: "Hero Image",
      url: "/hero.jpg",
      title: "Hero Image",
      alternativeText: "Hero Alt",
      caption: "",
      description: "",
      width: 1920,
      height: 1080,
    };

    const mockSiteLogo: AdaptedImage = {
      __typename: "Image",
      id: "logo-1",
      internalName: "Logo",
      url: "/logo.png",
      title: "Site Logo",
      alternativeText: "Logo Alt",
      caption: "",
      description: "",
      width: 100,
      height: 100,
    };

    const input: AdaptedContentSection = {
      entry: {
        __typename: "ContentItem",
        // `image` is the avatar and `coverImage` is the banner (see
        // migrate-legacy-content.ts's migrateHomeBanner: profilePicture -> image,
        // bannerImage -> coverImage), matching adaptHeroBanner's mapping below.
        image: mockSiteLogo,
        coverImage: mockImage,
        links: [
          { text: "LinkedIn", href: "https://linkedin.com" },
          { text: "GitHub", href: "https://github.com" },
        ],
      },
    } as unknown as AdaptedContentSection;

    const result = adaptHeroBanner(input);

    expect(result.bannerImage).toEqual(mockImage);
    expect(result.avatarImage).toEqual(mockSiteLogo);

    expect(result.iconLinks).toHaveLength(2);
    expect(result.iconLinks[0].label).toBe("LinkedIn");
    expect(result.iconLinks[0].href).toBe("https://linkedin.com");
  });

  it("handles missing data gracefully", () => {
    const result = adaptHeroBanner({ entry: null } as any);
    expect(result.bannerImage).toBeNull();
    expect(result.avatarImage).toBeNull();
    expect(result.iconLinks).toEqual([]);
  });
});
