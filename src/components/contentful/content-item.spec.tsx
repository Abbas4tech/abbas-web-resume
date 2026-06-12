import { BLOCKS } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import type { AdaptedContentItem } from "@/contentful/adapters/content-item";
import { render, screen } from "@/test/utils";
import { ContentItem } from "./content-item";

describe("ContentItem", () => {
  it("renders content item with all elements", async () => {
    const mockData = {
      __typename: "ContentItem",
      id: "1",
      title: "Item Title",
      subtitle: "Item Subtitle",
      entryField: "Category",
      description: "Short desc",
      icon: { __typename: "Icon", id: "i1", name: "fa/FaStar" },
      startDate: new Date("2020-01-01"),
      endDate: new Date("2022-01-01"),
      body: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            data: {},
            content: [
              {
                nodeType: "text",
                value: "Rich text body",
                marks: [],
                data: {},
              },
            ],
          },
        ],
      } as any,
      subItems: [{ __typename: "Badge", id: "b1", title: "Badge 1" }],
      links: [
        {
          __typename: "Link",
          id: "l1",
          href: "https://example.com",
          text: "External Link",
        },
      ],
      image: { url: "/img.jpg", title: "Image Title", width: 100, height: 100 },
    };

    render(<ContentItem data={mockData as unknown as AdaptedContentItem} />);

    expect(screen.getByText("Item Title")).toBeInTheDocument();
    expect(screen.getByText("Item Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Short desc")).toBeInTheDocument();
    expect(screen.getByText("Rich text body")).toBeInTheDocument();
    expect(screen.getByText("2020 — 2022")).toBeInTheDocument();

    // Check nested badge
    expect(screen.getByText("Badge 1")).toBeInTheDocument();

    // Check links
    const link = screen.getByRole("link", { name: "External Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");

    // Icon
    expect(
      await screen.findByRole("img", { name: "fa/FaStar" })
    ).toBeInTheDocument();
  });
});
