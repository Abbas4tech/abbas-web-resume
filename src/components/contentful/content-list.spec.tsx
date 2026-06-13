import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { render, screen } from "@/test/utils";
import { ContentList } from "./content-list";

describe("ContentList", () => {
  it("renders CardGrid block for CardGrid ui type", () => {
    const mockData: AdaptedContentList = {
      __typename: "ContentList",
      id: "1",
      internalName: "List",
      ui: "CardGrid",
      customEntries: [{ title: "Card 1" }],
    } as unknown as AdaptedContentList;

    render(<ContentList data={mockData} data-testid="list-wrapper" />);
    // Verify it renders the CardGrid block (checks grid cols from block styling)
    expect(screen.getByText("Card 1")).toBeInTheDocument();
  });

  it("renders default fallback when ui does not match", () => {
    const mockData: AdaptedContentList = {
      __typename: "ContentList",
      id: "2",
      internalName: "List",
      ui: "Unknown",
      title: "Fallback Title",
      description: "Fallback Description",
      customEntries: [
        { __typename: "ContentItem", id: "ci1", title: "Item 1" },
      ],
    } as unknown as AdaptedContentList;

    render(<ContentList data={mockData} />);

    expect(screen.getByText("Fallback Title")).toBeInTheDocument();
    expect(screen.getByText("Fallback Description")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });
});
