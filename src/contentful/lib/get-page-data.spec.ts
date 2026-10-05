import { beforeEach, describe, expect, it, vi } from "vitest";
import { adaptPage } from "@/contentful/adapters/page";
import { contentfulSdk } from "@/contentful/lib/client";
import { getPageData } from "./get-page-data";

vi.mock("@/contentful/lib/client", () => ({
  contentfulSdk: {
    GetPageByPath: vi.fn(),
  },
}));

vi.mock("@/contentful/adapters/page", () => ({
  adaptPage: vi.fn((input) =>
    input ? { __typename: "Page", id: "mock-page", title: "Mock Page" } : null
  ),
}));

describe("getPageData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches page by path and passes first item to adaptPage", async () => {
    const mockItem = { sys: { id: "page-1" }, title: "About", path: "/about" };
    vi.mocked(contentfulSdk.GetPageByPath).mockResolvedValueOnce({
      data: {
        pageCollection: {
          items: [mockItem],
        },
      },
    } as unknown as Awaited<ReturnType<typeof contentfulSdk.GetPageByPath>>);

    const result = await getPageData("/about");

    expect(contentfulSdk.GetPageByPath).toHaveBeenCalledWith({
      path: "/about",
    });
    expect(adaptPage).toHaveBeenCalledWith(mockItem);
    expect(result).toEqual({
      __typename: "Page",
      id: "mock-page",
      title: "Mock Page",
    });
  });

  it("handles empty page collection gracefully", async () => {
    vi.mocked(contentfulSdk.GetPageByPath).mockResolvedValueOnce({
      data: {
        pageCollection: {
          items: [],
        },
      },
    } as unknown as Awaited<ReturnType<typeof contentfulSdk.GetPageByPath>>);

    const result = await getPageData("/non-existent");

    expect(contentfulSdk.GetPageByPath).toHaveBeenCalledWith({
      path: "/non-existent",
    });
    expect(adaptPage).toHaveBeenCalledWith(undefined);
    expect(result).toBeNull();
  });
});
