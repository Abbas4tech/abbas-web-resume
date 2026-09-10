import { describe, expect, it } from "vitest";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import { adaptAnnouncementBanner } from "./announcement-banner.adapter";

describe("adaptAnnouncementBanner", () => {
  it("adapts the entry's description, tag-derived variant, icon, and first link", () => {
    const input: AdaptedContentSection = {
      __typename: "ContentSection",
      id: "section-1",
      internalName: "Announcement",
      ui: "AnnouncementBanner",
      entry: {
        __typename: "ContentItem",
        title: "Fallback title",
        description: "Open to new opportunities.",
        tags: ["success"],
        icon: { iconCode: "md/MdWork" },
        links: [{ text: "Get in touch", href: "/contact" }],
      },
    } as unknown as AdaptedContentSection;

    const result = adaptAnnouncementBanner(input);

    expect(result.message).toBe("Open to new opportunities.");
    expect(result.variant).toBe("success");
    expect(result.icon).toEqual({ iconCode: "md/MdWork" });
    expect(result.link).toEqual({ text: "Get in touch", href: "/contact" });
  });

  it("falls back to the entry title and 'info' variant when description/tags are missing", () => {
    const input: AdaptedContentSection = {
      __typename: "ContentSection",
      id: "section-2",
      internalName: "Announcement",
      ui: "AnnouncementBanner",
      entry: {
        __typename: "ContentItem",
        title: "Fallback title",
      },
    } as unknown as AdaptedContentSection;

    const result = adaptAnnouncementBanner(input);

    expect(result.message).toBe("Fallback title");
    expect(result.variant).toBe("info");
    expect(result.link).toBeUndefined();
  });
});
