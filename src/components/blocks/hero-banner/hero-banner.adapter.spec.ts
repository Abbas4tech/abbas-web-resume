import { describe, expect, it } from "vitest";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import { adaptHeroBanner } from "./hero-banner.adapter";

describe("adaptHeroBanner", () => {
  it("adapts ContentSection to HeroBannerProps", () => {
    const input: AdaptedContentSection = {
      entry: {
        image: {
          url: "/hero.jpg",
          title: "Hero Image",
          width: 1920,
          height: 1080,
        },
        links: [
          { text: "LinkedIn", href: "https://linkedin.com" },
          { text: "GitHub", href: "https://github.com" },
        ],
      },
    } as unknown as AdaptedContentSection;

    const result = adaptHeroBanner(input);

    expect(result.bannerImageSrc).toBe("/hero.jpg");
    expect(result.bannerImageAlt).toBe("Hero Image");
    expect(result.avatarSrc).toBe("/hero.jpg"); // Falls back to same image based on current logic

    expect(result.socialLinks).toHaveLength(2);
    expect(result.socialLinks[0].label).toBe("LinkedIn");
    expect(result.socialLinks[0].href).toBe("https://linkedin.com");
  });

  it("handles missing data gracefully", () => {
    const result = adaptHeroBanner({ entry: null } as any);
    expect(result.bannerImageSrc).toBe("");
    expect(result.socialLinks).toEqual([]);
  });
});
