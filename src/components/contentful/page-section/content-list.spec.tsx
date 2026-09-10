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

  it("renders TimelineSection block for TimelineSection ui type", () => {
    const mockData: AdaptedContentList = {
      __typename: "ContentList",
      id: "3",
      internalName: "Experience",
      ui: "TimelineSection",
      customEntries: [{ title: "Senior Frontend Engineer" }],
    } as unknown as AdaptedContentList;

    render(<ContentList data={mockData} />);
    expect(screen.getByText("Senior Frontend Engineer")).toBeInTheDocument();
  });

  it("renders SplitContentPanel block for SplitContentPanel ui type", () => {
    const mockData: AdaptedContentList = {
      __typename: "ContentList",
      id: "4",
      internalName: "About",
      ui: "SplitContentPanel",
      customEntries: [{ title: "React", description: "Advanced" }],
    } as unknown as AdaptedContentList;

    render(<ContentList data={mockData} />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders PanelShowcase block for PanelShowcase ui type", () => {
    const mockData: AdaptedContentList = {
      __typename: "ContentList",
      id: "5",
      internalName: "Skills",
      ui: "PanelShowcase",
      customEntries: [{ title: "Frontend", subItems: [] }],
    } as unknown as AdaptedContentList;

    render(<ContentList data={mockData} />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
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
