import { describe, expect, it } from "vitest";
import type { getAllPathsQuery } from "../generated/contentful-sdk.generated";
import { adaptPagePaths } from "./page-paths";

describe("adaptPagePaths", () => {
  it("returns an empty array when data is null or undefined", () => {
    expect(adaptPagePaths(null)).toEqual([]);
    expect(adaptPagePaths(undefined)).toEqual([]);
  });

  it("handles empty items collection gracefully", () => {
    expect(adaptPagePaths({ items: [] })).toEqual([]);
    expect(adaptPagePaths({ pageCollection: { items: [] } })).toEqual([]);
  });

  it("adapts root and nested paths to Next.js slug arrays", () => {
    const rawData: getAllPathsQuery = {
      pageCollection: {
        items: [
          { path: "/" },
          { path: "/about" },
          { path: "/projects/web-resume" },
          { path: "/experience" },
        ],
      },
    };

    expect(adaptPagePaths(rawData)).toEqual([
      { slug: [] },
      { slug: ["about"] },
      { slug: ["projects", "web-resume"] },
      { slug: ["experience"] },
    ]);
  });

  it("filters out null or missing path items", () => {
    const rawData = {
      items: [null, { path: null }, { path: undefined }, { path: "/skills" }],
    };

    expect(
      adaptPagePaths(rawData as unknown as getAllPathsQuery["pageCollection"])
    ).toEqual([{ slug: ["skills"] }]);
  });
});
