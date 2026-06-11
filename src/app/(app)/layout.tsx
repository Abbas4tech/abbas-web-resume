import type { FC, PropsWithChildren } from "react";
import { ContentfulLayout } from "@/components/contentful/contentful-layout";
import { adaptLayout } from "@/contentful/adapters/layout";
import { contentfulSdk } from "@/contentful/lib/client";

const layout: FC<PropsWithChildren> = async ({ children }) => {
  const response = await contentfulSdk.GetLayout();
  const rawLayout = response.data?.layoutCollection?.items?.[0];
  const layoutData = adaptLayout(rawLayout);

  if (!layoutData) {
    return <div>Layout data missing</div>;
  }

  return <ContentfulLayout data={layoutData}>{children}</ContentfulLayout>;
};

export default layout;
