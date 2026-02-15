import React from "react";

import ContentfulPage from "@/components/ContentfulPage";
import { getSanitizedPath } from "@/lib/utils";

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
