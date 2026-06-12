import type { Document } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import { adaptRichText } from "./rich-text.adapter";

describe("adaptRichText", () => {
  it("adapts Contentful json into RichTextProps", () => {
    const json: Document = {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [],
    };

    expect(adaptRichText({ json })).toEqual({ document: json });
  });
});
