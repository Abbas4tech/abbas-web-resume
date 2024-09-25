"use client";
import React from "react";
import { usePathname, notFound } from "next/navigation";
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

  const pageInformation = pagesInformation.find(
    (e) => e.identifier.toLowerCase() === page
  );
  console.log(pageInformation);
  if (!pageInformation) {
    notFound();
  }
  const { title, contentAnimation, headingAnimation, pageData, identifier } =
    pageInformation;

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
