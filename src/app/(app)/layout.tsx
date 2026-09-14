import type { FC, PropsWithChildren } from "react";
import { getLayoutData } from "@/app/layout";
import { ContentfulLayout } from "@/components/contentful/assembly/contentful-layout";

const layout: FC<PropsWithChildren> = async ({ children }) => {
  const layoutData = await getLayoutData();

  if (!layoutData) {
    throw new Error("Layout data missing");
  }

  return <ContentfulLayout data={layoutData}>{children}</ContentfulLayout>;
};

export default layout;
