import type { Document } from "@contentful/rich-text-types";
import { BLOCKS } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { RichText } from "./rich-text";

describe("RichText", () => {
  const mockDocument: Document = {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.HEADING_2,
        data: {},
        content: [
          { nodeType: "text", value: "Test Heading", marks: [], data: {} },
        ],
      },
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [
          { nodeType: "text", value: "Test Paragraph", marks: [], data: {} },
        ],
      },
    ],
  };

  it("renders rich text elements correctly", () => {
    render(
      <RichText
        className="rich-wrapper"
        document={mockDocument}
        paragraphClass="custom-p"
      />
    );

    const wrapper = screen.getByText("Test Heading").parentElement; // the document wrapper
    expect(wrapper).toHaveClass("rich-wrapper");

    const heading = screen.getByText("Test Heading");
    expect(heading.tagName).toBe("H2");
    expect(heading).toHaveClass("text-2xl", "font-semibold"); // default getHeadingClass

    const paragraph = screen.getByText("Test Paragraph");
    expect(paragraph.tagName).toBe("P");
    expect(paragraph).toHaveClass("custom-p");
  });
});
