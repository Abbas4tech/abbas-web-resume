import React from "react";

import ContentfulPage from "@/components/ContentfulPage";

/**
 * Ensures the input string starts with a leading slash '/'.
 * If it already does, returns unchanged. Useful for URL paths in React/Next.js routing.
 *
 * @param path - The input string (e.g., 'about' or '/about')
 * @returns The normalized path (e.g., '/about')
 */
export function getSanitizedPath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

const Page = async ({
  params,
}: {
  params: Promise<{ path: string }>;
}): Promise<React.JSX.Element> => {
  let { path } = await params;
  path = getSanitizedPath(path);
  return <ContentfulPage path={path} />;
};

export default Page;
