import { BLOCKS } from "@contentful/rich-text-types";
import { fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import type { ContentTabItem } from "./content-tabs";
import { ContentTabs } from "./content-tabs";

function paragraph(text: string) {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: [
      {
        nodeType: BLOCKS.PARAGRAPH,
        data: {},
        content: [{ nodeType: "text", value: text, marks: [], data: {} }],
      },
    ],
  } as ContentTabItem["content"];
}

describe("ContentTabs", () => {
  const mockProps = {
    tabs: [
      { label: "Summary", content: paragraph("Summary content") },
      { label: "Experience", content: paragraph("Experience content") },
    ],
  };

  it("renders the first tab's panel by default", () => {
    render(<ContentTabs {...mockProps} />);

    expect(screen.getByText("Summary content")).toBeInTheDocument();
    expect(screen.queryByText("Experience content")).not.toBeInTheDocument();
  });

  it("switches panels when a tab is clicked", () => {
    render(<ContentTabs {...mockProps} />);

    fireEvent.click(screen.getByRole("tab", { name: "Experience" }));

    expect(screen.getByText("Experience content")).toBeInTheDocument();
    expect(screen.queryByText("Summary content")).not.toBeInTheDocument();
  });
});
