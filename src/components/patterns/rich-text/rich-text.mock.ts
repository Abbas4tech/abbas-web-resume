import { BLOCKS } from "@contentful/rich-text-types";
import type { RichTextProps } from "./rich-text";

export const baseMock: RichTextProps = {
  document: {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.HEADING_1,
        data: {},
        content: [
          {
            nodeType: "text",
            value: "Welcome to my portfolio",
            marks: [],
            data: {},
          },
        ],
      },
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          {
            nodeType: "text",
            value: "I'm a full-stack developer who loves building things. ",
            marks: [],
            data: {},
          },
          {
            nodeType: "text",
            value: "This text is bold",
            marks: [{ type: "bold" }],
            data: {},
          },
          { nodeType: "text", value: " and ", marks: [], data: {} },
          {
            nodeType: "text",
            value: "this is italicized.",
            marks: [{ type: "italic" }],
            data: {},
          },
        ],
      },
    ],
  },
};
