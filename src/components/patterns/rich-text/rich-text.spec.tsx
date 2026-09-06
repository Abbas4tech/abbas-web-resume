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

  function textNode(value: string) {
    return { nodeType: "text", value, marks: [], data: {} };
  }

  it("renders every heading level with the default heading class", () => {
    const levels = [1, 2, 3, 4, 5, 6] as const;
    const document: Document = {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: levels.map((level) => ({
        nodeType: BLOCKS[`HEADING_${level}` as `HEADING_${typeof level}`],
        data: {},
        content: [textNode(`Heading ${level}`)],
      })),
    };

    render(<RichText document={document} />);

    for (const level of levels) {
      const heading = screen.getByText(`Heading ${level}`);
      expect(heading.tagName).toBe(`H${level}`);
      expect(heading).toHaveClass("text-2xl", "font-semibold");
    }
  });

  it("calls a function headingClass with the heading level instead of a static class", () => {
    const document: Document = {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.HEADING_3,
          data: {},
          content: [textNode("Section title")],
        },
      ],
    };

    render(
      <RichText
        document={document}
        headingClass={(level) => `level-${level}`}
      />
    );

    expect(screen.getByText("Section title")).toHaveClass("level-3");
  });

  it("renders ordered and unordered lists with their items", () => {
    const document: Document = {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.UL_LIST,
          data: {},
          content: [
            {
              nodeType: BLOCKS.LIST_ITEM,
              data: {},
              content: [
                {
                  nodeType: BLOCKS.PARAGRAPH,
                  data: {},
                  content: [textNode("Bullet one")],
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.OL_LIST,
          data: {},
          content: [
            {
              nodeType: BLOCKS.LIST_ITEM,
              data: {},
              content: [
                {
                  nodeType: BLOCKS.PARAGRAPH,
                  data: {},
                  content: [textNode("Step one")],
                },
              ],
            },
          ],
        },
      ],
    };

    render(<RichText document={document} listClass="my-list" />);

    const bullet = screen.getByText("Bullet one");
    const orderedItem = screen.getByText("Step one");
    expect(bullet.closest("li")).not.toBeNull();
    expect(orderedItem.closest("li")).not.toBeNull();
    expect(bullet.closest("ul")).toHaveClass("list-disc", "my-list");
    expect(orderedItem.closest("ol")).toHaveClass("list-decimal", "my-list");
  });

  it("renders a blockquote with the configured class", () => {
    const document: Document = {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.QUOTE,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [textNode("A wise quote")],
            },
          ],
        },
      ],
    };

    render(<RichText blockquoteClass="pull-quote" document={document} />);

    expect(screen.getByText("A wise quote").closest("blockquote")).toHaveClass(
      "pull-quote"
    );
  });

  it("renders a table with row and cell classes applied", () => {
    const document: Document = {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.TABLE,
          data: {},
          content: [
            {
              nodeType: BLOCKS.TABLE_ROW,
              data: {},
              content: [
                {
                  nodeType: BLOCKS.TABLE_CELL,
                  data: {},
                  content: [
                    {
                      nodeType: BLOCKS.PARAGRAPH,
                      data: {},
                      content: [textNode("Cell value")],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    render(
      <RichText
        document={document}
        tableCellClass="cell"
        tableClass="grid-table"
        tableRowClass="row"
      />
    );

    const cell = screen.getByText("Cell value").closest("td");
    expect(cell).toHaveClass("cell");
    expect(cell?.closest("tr")).toHaveClass("row");
    expect(cell?.closest("table")).toHaveClass("grid-table");
  });

  it("renders bold, italic, underline, and code marks", () => {
    const document: Document = {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: "text",
              value: "Bold",
              marks: [{ type: "bold" }],
              data: {},
            },
            {
              nodeType: "text",
              value: "Italic",
              marks: [{ type: "italic" }],
              data: {},
            },
            {
              nodeType: "text",
              value: "Underline",
              marks: [{ type: "underline" }],
              data: {},
            },
            {
              nodeType: "text",
              value: "Code",
              marks: [{ type: "code" }],
              data: {},
            },
          ],
        },
      ],
    };

    render(<RichText codeClass="inline-code" document={document} />);

    expect(screen.getByText("Bold").tagName).toBe("STRONG");
    expect(screen.getByText("Italic").tagName).toBe("EM");
    expect(screen.getByText("Underline").tagName).toBe("U");
    const code = screen.getByText("Code");
    expect(code.tagName).toBe("CODE");
    expect(code).toHaveClass("inline-code");
  });
});
