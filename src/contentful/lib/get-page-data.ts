import React from "react";
import { adaptPage } from "@/contentful/adapters/page";
import { contentfulSdk } from "@/contentful/lib/client";

const cacheFn =
  typeof React.cache === "function"
    ? React.cache
    : <T extends (...args: never[]) => unknown>(fn: T): T => fn;

export const getPageData = cacheFn(async (path: string) => {
  const response = await contentfulSdk.GetPageByPath({ path });
  const rawPage = response.data?.pageCollection?.items?.[0];
  return adaptPage(rawPage);
});
