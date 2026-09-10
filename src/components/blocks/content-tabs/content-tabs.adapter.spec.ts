import { BLOCKS } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { adaptContentTabs } from "./content-tabs.adapter";

describe("adaptContentTabs", () => {
  it("adapts ContentList entries into label/content tab pairs", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Summary",
          body: { nodeType: BLOCKS.DOCUMENT, data: {}, content: [] },
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptContentTabs(input);

    expect(result.tabs).toHaveLength(1);
    expect(result.tabs[0].label).toBe("Summary");
    expect(result.tabs[0].content.nodeType).toBe(BLOCKS.DOCUMENT);
  });

  it("defaults to an empty document when body is missing", () => {
    const input: AdaptedContentList = {
      customEntries: [{ title: "Empty tab" }],
    } as unknown as AdaptedContentList;

    const result = adaptContentTabs(input);

    expect(result.tabs[0].content).toEqual({
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [],
    });
  });
});
