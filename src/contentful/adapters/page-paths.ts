import type { getAllPathsQuery } from "../generated/contentful-sdk.generated";

export interface StaticPageParam {
  slug: string[];
}

export function adaptPagePaths(
  data: getAllPathsQuery["pageCollection"] | getAllPathsQuery | null | undefined
): StaticPageParam[] {
  if (!data) {
    return [];
  }

  const items =
    "items" in data ? data.items : (data.pageCollection?.items ?? []);

  return items
    .filter((item): item is NonNullable<typeof item> & { path: string } =>
      Boolean(item?.path)
    )
    .map((item) => ({
      slug: item.path.split("/").filter(Boolean),
    }));
}
