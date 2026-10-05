import { beforeEach, describe, expect, it, vi } from "vitest";
import { adaptPagePaths } from "@/contentful/adapters/page-paths";
import { contentfulSdk } from "@/contentful/lib/client";
import { getPagePaths } from "./get-page-paths";

vi.mock("@/contentful/lib/client", () => ({
  contentfulSdk: {
    getAllPaths: vi.fn(),
  },
}));

vi.mock("@/contentful/adapters/page-paths", () => ({
  adaptPagePaths: vi.fn((input) => (input ? [{ slug: ["about"] }] : [])),
}));

describe("getPagePaths", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches all paths and passes data to adaptPagePaths", async () => {
    const mockData = {
      pageCollection: {
        items: [{ path: "/about" }],
      },
    };
    vi.mocked(contentfulSdk.getAllPaths).mockResolvedValueOnce({
      data: mockData,
    } as unknown as Awaited<ReturnType<typeof contentfulSdk.getAllPaths>>);

    const result = await getPagePaths();

    expect(contentfulSdk.getAllPaths).toHaveBeenCalledTimes(1);
    expect(adaptPagePaths).toHaveBeenCalledWith(mockData);
    expect(result).toEqual([{ slug: ["about"] }]);
  });
});
