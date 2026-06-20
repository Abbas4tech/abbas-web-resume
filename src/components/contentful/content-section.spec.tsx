import type React from "react";
import { describe, expect, it, vi } from "vitest";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import { render, screen } from "@/test/utils";
import { ContentSection } from "./content-section";

vi.mock("@/contentful/lib/client", () => ({
  contentfulSdk: {
    GetLayout: vi.fn().mockResolvedValue({
      data: {
        layoutCollection: {
          items: [
            {
              sys: { id: "layout-1" },
              siteLogo: {
                sys: { id: "1" },
                internalName: "Logo",
                image: { url: "/logo.png" },
              },
            },
          ],
        },
      },
    }),
  },
}));

describe("ContentSection", () => {
  it("renders HeroBanner block for HeroBanner ui type", async () => {
    const mockData: AdaptedContentSection = {
      __typename: "ContentSection",
      id: "1",
      internalName: "Hero",
      ui: "HeroBanner",
      entry: {
        __typename: "ContentItem",
        title: "Hero Entry",
      } as any,
    } as unknown as AdaptedContentSection;

    const { container } = render(
      (await ContentSection({ data: mockData })) as React.ReactElement
    );
    expect(container.querySelectorAll("img").length).toBeGreaterThan(0);
  });

  it("renders default fallback when ui does not match", async () => {
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

    render((await ContentSection({ data: mockData })) as React.ReactElement);
    expect(screen.getByText("Fallback Entry")).toBeInTheDocument();
  });

  it("returns null if no entry", async () => {
    const mockData: AdaptedContentSection = {
      ui: "HeroBanner",
    } as any;

    const { container } = render(
      (await ContentSection({ data: mockData })) as React.ReactElement
    );
    expect(container.querySelector(".group")).toBeEmptyDOMElement();
  });
});
