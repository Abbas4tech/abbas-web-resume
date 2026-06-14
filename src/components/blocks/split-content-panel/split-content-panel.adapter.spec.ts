import { BLOCKS } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { adaptSplitContentPanel } from "./split-content-panel.adapter";

describe("adaptSplitContentPanel", () => {
  it("adapts generic ContentList to SplitContentPanelProps", () => {
    const input: AdaptedContentList = {
      internalName: "Bio Section",
      id: "bio",
      description: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [],
      },
      customEntries: [
        {
          id: "badge1",
          title: "Experience",
          description: "5 Years",
          icon: {
            iconCode: "fa/FaBriefcase",
          },
        },
      ],
    } as unknown as AdaptedContentList;

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

  it("handles missing description or customEntries", () => {
    const input: AdaptedContentList = {
      internalName: "Empty Bio",
      id: "empty",
    } as unknown as AdaptedContentList;

    const result = adaptSplitContentPanel(input);

    expect(result.description).toBeUndefined();
    expect(result.infoRows).toEqual([]);
  });
});
