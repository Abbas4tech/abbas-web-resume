import { describe, expect, it } from "vitest";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import { render, screen } from "@/test/utils";
import { ContentSection } from "./content-section";

describe("ContentSection", () => {
  it("renders HeroBanner block for HeroBanner ui type", () => {
    const mockData: AdaptedContentSection = {
      __typename: "ContentSection",
      id: "1",
      internalName: "Hero",
      ui: "HeroBanner",
      entry: { title: "Hero Entry" } as any,
    } as unknown as AdaptedContentSection;

    const { container } = render(<ContentSection data={mockData} />);
    // Hero banner displays Avatar and other images which might have empty alt
    expect(container.querySelectorAll("img").length).toBeGreaterThan(0);
  });

  it("renders default fallback when ui does not match", () => {
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
    expect(screen.getByText("Fallback Entry")).toBeInTheDocument();
  });

  it("returns null if no entry", () => {
    const mockData: AdaptedContentSection = {
      ui: "HeroBanner",
    } as any;

    const { container } = render(<ContentSection data={mockData} />);
    expect(container.querySelector(".group")).toBeEmptyDOMElement();
  });
});
