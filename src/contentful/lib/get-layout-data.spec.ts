import { beforeEach, describe, expect, it, vi } from "vitest";
import { adaptLayout } from "@/contentful/adapters/layout";
import { contentfulSdk } from "@/contentful/lib/client";
import { getLayoutData } from "./get-layout-data";

vi.mock("@/contentful/lib/client", () => ({
  contentfulSdk: {
    GetLayout: vi.fn(),
  },
}));

vi.mock("@/contentful/adapters/layout", () => ({
  adaptLayout: vi.fn((input) =>
    input ? { __typename: "Layout", id: "mock-layout" } : null
  ),
}));

describe("getLayoutData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches layout data and passes first item to adaptLayout", async () => {
    const mockItem = { sys: { id: "item-1" }, title: "My Resume" };
    vi.mocked(contentfulSdk.GetLayout).mockResolvedValueOnce({
      data: {
        layoutCollection: {
          items: [mockItem],
        },
      },
    } as unknown as Awaited<ReturnType<typeof contentfulSdk.GetLayout>>);

    const result = await getLayoutData();

    expect(contentfulSdk.GetLayout).toHaveBeenCalledTimes(1);
    expect(adaptLayout).toHaveBeenCalledWith(mockItem);
    expect(result).toEqual({ __typename: "Layout", id: "mock-layout" });
  });

  it("handles empty layout collection gracefully", async () => {
    vi.mocked(contentfulSdk.GetLayout).mockResolvedValueOnce({
      data: {
        layoutCollection: {
          items: [],
        },
      },
    } as unknown as Awaited<ReturnType<typeof contentfulSdk.GetLayout>>);

    const result = await getLayoutData();

    expect(contentfulSdk.GetLayout).toHaveBeenCalledTimes(1);
    expect(adaptLayout).toHaveBeenCalledWith(undefined);
    expect(result).toBeNull();
  });
});
