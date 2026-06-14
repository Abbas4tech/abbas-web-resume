import { describe, expect, it, vi } from "vitest";
import type { AdaptedPage } from "@/contentful/adapters/page";
import { render, screen } from "@/test/utils";
import { ContentfulPage } from "./contentful-page";

vi.mock("./content-section", () => ({
  ContentSection: ({ data }: any) => (
    <div>{data.entry?.title || "Content Section Mock"}</div>
  ),
}));

describe("ContentfulPage", () => {
  it("renders ContentList and ContentSection in top and bottom areas", () => {
    const mockData = {
      __typename: "Page",
      id: "1",
      title: "Home",
      slug: "/",
      pageUrl: "/",
      topContentArea: [
        {
          __typename: "ContentSection",
          id: "cs1",
          internalName: "Top Sec",
          entry: { title: "Top Sec Entry" },
        } as any,
      ],
      bottomContentArea: [
        {
          __typename: "ContentList",
          id: "cl1",
          internalName: "Bottom List",
          customEntries: [{ title: "Bottom List Entry" }],
        } as any,
      ],
    };

    render(<ContentfulPage data={mockData as unknown as AdaptedPage} />);

    expect(screen.getByText("Top Sec Entry")).toBeInTheDocument();
    expect(screen.getByText("Bottom List Entry")).toBeInTheDocument();
  });
});
