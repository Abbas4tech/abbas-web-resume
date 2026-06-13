import { BLOCKS } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import { adaptSplitContentPanel } from "./split-content-panel.adapter";

describe("adaptSplitContentPanel", () => {
  it("adapts generic ContentSection to SplitContentPanelProps", () => {
    const input: AdaptedContentSection = {
      internalName: "Bio Section",
      sectionId: "bio",
      entry: {
        body: {
          nodeType: BLOCKS.DOCUMENT,
          data: {},
          content: [],
        },
        subItems: [
          {
            internalName: "Experience",
            title: "5 Years",
            icon: { iconCode: "fa/FaBriefcase" },
          },
        ],
      },
    } as unknown as AdaptedContentSection;

    const result = adaptSplitContentPanel(input);

    expect(result.animation).toBeUndefined();
    expect(result.description?.nodeType).toBe(BLOCKS.DOCUMENT);
    expect(result.infoRows).toHaveLength(1);
    expect(result.infoRows[0]).toEqual({
      label: "Experience",
      value: "5 Years",
      icon: { iconCode: "fa/FaBriefcase" },
    });
  });

  it("handles missing entry or subItems", () => {
    const input: AdaptedContentSection = {
      internalName: "Empty Bio",
      sectionId: "empty",
    } as unknown as AdaptedContentSection;

    const result = adaptSplitContentPanel(input);

    expect(result.description).toBeUndefined();
    expect(result.infoRows).toEqual([]);
  });
});
