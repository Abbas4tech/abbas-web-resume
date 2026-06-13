import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { adaptCardGrid } from "./card-grid.adapter";

describe("adaptCardGrid", () => {
  it("adapts generic ContentList to CardGridProps", () => {
    const input: AdaptedContentList = {
      internalName: "Projects",
      sectionId: "projects",
      customEntries: [
        {
          title: "My Project",
          subtitle: "A subtitle",
          links: [{ href: "https://example.com/project" }],
          icon: { iconCode: "fa/FaCode" },
          image: {
            url: "/project.jpg",
            title: "Project Thumbnail",
            width: 800,
            height: 600,
          },
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptCardGrid(input);

    expect(result.animation).toBeUndefined();
    expect(result.cards).toHaveLength(1);
    expect(result.cards[0]).toEqual({
      title: "My Project",
      description: "A subtitle",
      href: "https://example.com/project",
      linkIcon: { iconCode: "fa/FaCode" },
      thumbnailAlt: "Project Thumbnail",
      thumbnailSrc: "/project.jpg",
      thumbnailWidth: 800,
      thumbnailHeight: 600,
    });
  });

  it("handles missing optional fields", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Minimal Project",
        },
      ],
    } as AdaptedContentList;

    const result = adaptCardGrid(input);
    expect(result.cards[0].href).toBe("#");
    expect(result.cards[0].thumbnailSrc).toBe("");
  });
});
