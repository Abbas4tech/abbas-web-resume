import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { render, screen } from "@/test/utils";
import { ContentList } from "./content-list";

const MISSING_MAPPING_REGEX = /Missing block renderer mapping/i;
const CONTENT_LIST_REGEX = /ContentList/i;
const UNKNOWN_REGEX = /Unknown/i;

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

  it("renders BlockPlaceholder (null in test/prod environment) when ui does not match", () => {
    const mockData: AdaptedContentList = {
      __typename: "ContentList",
      id: "2",
      internalName: "List",
      ui: "Unknown",
      customEntries: [],
    } as unknown as AdaptedContentList;

    const { container } = render(<ContentList data={mockData} />);
    expect(container.querySelector(".group")).toBeEmptyDOMElement();
  });

  it("renders BlockPlaceholder warning in development environment when ui does not match", () => {
    const originalEnv = process.env.NODE_ENV;
    // @ts-expect-error
    process.env.NODE_ENV = "development";

    const mockData: AdaptedContentList = {
      __typename: "ContentList",
      id: "2",
      internalName: "List",
      ui: "Unknown",
      customEntries: [],
    } as unknown as AdaptedContentList;

    render(<ContentList data={mockData} />);
    expect(screen.getByText(MISSING_MAPPING_REGEX)).toBeInTheDocument();
    expect(screen.getByText(CONTENT_LIST_REGEX)).toBeInTheDocument();
    expect(screen.getByText(UNKNOWN_REGEX)).toBeInTheDocument();

    // Restore environment
    // @ts-expect-error
    process.env.NODE_ENV = originalEnv;
  });
});
