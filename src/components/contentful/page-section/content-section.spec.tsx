import { describe, expect, it } from "vitest";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import { render, screen } from "@/test/utils";
import { ContentSection } from "./content-section";

const MISSING_MAPPING_REGEX = /Missing block renderer mapping/i;
const CONTENT_SECTION_REGEX = /ContentSection/i;
const UNKNOWN_REGEX = /Unknown/i;

describe("ContentSection", () => {
  it("renders HeroBanner block for HeroBanner ui type", () => {
    const mockData: AdaptedContentSection = {
      __typename: "ContentSection",
      id: "1",
      internalName: "Hero",
      ui: "HeroBanner",
      entry: {
        __typename: "ContentItem",
        id: "ci1",
        title: "Hero Entry",
        coverImage: {
          __typename: "Image",
          id: "avatar",
          url: "/logo.png",
          alternativeText: "Logo",
        },
      } as any,
    } as unknown as AdaptedContentSection;

    const { container } = render(<ContentSection data={mockData} />);
    expect(container.querySelectorAll("img").length).toBeGreaterThan(0);
  });

  it("renders BlockPlaceholder (null in test/prod environment) when ui does not match", () => {
    const mockData: AdaptedContentSection = {
      __typename: "ContentSection",
      id: "2",
      internalName: "Unknown Section",
      ui: "Unknown",
      entry: {
        __typename: "ContentItem",
        id: "ci1",
        title: "Fallback Entry",
      } as any,
    } as unknown as AdaptedContentSection;

    const { container } = render(<ContentSection data={mockData} />);
    expect(container.querySelector(".group")).toBeEmptyDOMElement();
  });

  it("renders BlockPlaceholder warning in development environment when ui does not match", () => {
    const originalEnv = process.env.NODE_ENV;
    // @ts-expect-error
    process.env.NODE_ENV = "development";

    const mockData: AdaptedContentSection = {
      __typename: "ContentSection",
      id: "2",
      internalName: "Unknown Section",
      ui: "Unknown",
      entry: {
        __typename: "ContentItem",
        id: "ci1",
        title: "Fallback Entry",
      } as any,
    } as unknown as AdaptedContentSection;

    render(<ContentSection data={mockData} />);
    expect(screen.getByText(MISSING_MAPPING_REGEX)).toBeInTheDocument();
    expect(screen.getByText(CONTENT_SECTION_REGEX)).toBeInTheDocument();
    expect(screen.getByText(UNKNOWN_REGEX)).toBeInTheDocument();

    // Restore environment
    // @ts-expect-error
    process.env.NODE_ENV = originalEnv;
  });
});
