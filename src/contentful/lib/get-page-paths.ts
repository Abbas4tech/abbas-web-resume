import React from "react";
import { adaptPagePaths } from "@/contentful/adapters/page-paths";
import { contentfulSdk } from "@/contentful/lib/client";

const cacheFn =
  typeof React.cache === "function"
    ? React.cache
    : <T extends (...args: never[]) => unknown>(fn: T): T => fn;

export const getPagePaths = cacheFn(async () => {
  const response = await contentfulSdk.getAllPaths();
  return adaptPagePaths(response.data);
});
