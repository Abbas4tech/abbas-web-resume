import React from "react";
import { adaptLayout } from "@/contentful/adapters/layout";
import { contentfulSdk } from "@/contentful/lib/client";

const cacheFn =
  typeof React.cache === "function"
    ? React.cache
    : <T extends (...args: never[]) => unknown>(fn: T): T => fn;

export const getLayoutData = cacheFn(async () => {
  const response = await contentfulSdk.GetLayout();
  const rawLayout = response.data?.layoutCollection?.items?.[0];
  return adaptLayout(rawLayout);
});
