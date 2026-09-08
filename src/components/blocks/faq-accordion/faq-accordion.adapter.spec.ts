import { BLOCKS } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { adaptFaqAccordion } from "./faq-accordion.adapter";

describe("adaptFaqAccordion", () => {
  it("adapts ContentList entries into question/answer pairs", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Do you offer support?",
          body: {
            nodeType: BLOCKS.DOCUMENT,
            data: {},
            content: [],
          },
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptFaqAccordion(input);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].question).toBe("Do you offer support?");
    expect(result.items[0].answer.nodeType).toBe(BLOCKS.DOCUMENT);
  });

  it("defaults to an empty document when body is missing", () => {
    const input: AdaptedContentList = {
      customEntries: [{ title: "Untitled question" }],
    } as unknown as AdaptedContentList;

    const result = adaptFaqAccordion(input);

    expect(result.items[0].answer).toEqual({
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [],
    });
  });
});
