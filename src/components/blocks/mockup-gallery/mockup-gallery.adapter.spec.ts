import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import {
  adaptMockupGalleryBrowser,
  adaptMockupGalleryPhone,
} from "./mockup-gallery.adapter";

const input = {
  customEntries: [
    {
      id: "my-project",
      title: "My Project",
      description: "A subtitle",
      links: [{ href: "https://example.com/project" }],
      image: {
        url: "/project.jpg",
        title: "Project Thumbnail",
        width: 800,
        height: 600,
      },
    },
  ],
} as unknown as AdaptedContentList;

describe("adaptMockupGalleryBrowser", () => {
  it("adapts generic ContentList to MockupGalleryProps with frame='browser'", () => {
    const result = adaptMockupGalleryBrowser(input);

    expect(result.frame).toBe("browser");
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toEqual({
      id: "my-project",
      title: "My Project",
      description: "A subtitle",
      links: [{ href: "https://example.com/project" }],
      imageAlt: "Project Thumbnail",
      imageSrc: "/project.jpg",
      imageWidth: 800,
      imageHeight: 600,
    });
  });
});

describe("adaptMockupGalleryPhone", () => {
  it("adapts generic ContentList to MockupGalleryProps with frame='phone'", () => {
    const result = adaptMockupGalleryPhone(input);
    expect(result.frame).toBe("phone");
    expect(result.items).toHaveLength(1);
  });
});
