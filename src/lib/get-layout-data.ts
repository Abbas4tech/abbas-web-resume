import { cache } from "react";
import { adaptLayout } from "@/contentful/adapters/layout";
import { contentfulSdk } from "@/contentful/lib/client";

export const getLayoutData = cache(async () => {
  const response = await contentfulSdk.GetLayout();
  const rawLayout = response.data?.layoutCollection?.items?.[0];
  return adaptLayout(rawLayout);
});
