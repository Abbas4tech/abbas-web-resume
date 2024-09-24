"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { PageWrapper } from "@components";
import { useApplicationData } from "@context/useApplication";

interface PageTemplateProps<T> {
  renderItem: (item: T) => JSX.Element;
  className: string;
}

const PageTemplate = <T,>({
  renderItem,
  className = "",
}: PageTemplateProps<T>) => {
  const page = usePathname().slice(1);
  const { pagesInformation } = useApplicationData();
  const { title, contentAnimation, headingAnimation, pageData, identifier } =
    pagesInformation[page];
  const pageInfo = pageData as T[];

  return (
    <PageWrapper
      iconId={identifier}
      title={title}
      headingAnimation={headingAnimation}
    >
      <div className={`${className}`} data-aos={contentAnimation}>
        {pageInfo.map((item: T, index: number) => renderItem(item))}
      </div>
    </PageWrapper>
  );
};

export default PageTemplate;
