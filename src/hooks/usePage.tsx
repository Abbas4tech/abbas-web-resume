import React, { useState, useEffect, RefObject } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useApplicationData } from "@context";
import { MetaPage } from "@utils/contentful";

interface usePageProps {
  ref?: RefObject<HTMLElement>;
}

const usePage = ({ ref }: usePageProps) => {
  const router = useRouter();
  const { pages } = useApplicationData();

  const defaultPage = pages.find(
    ({ isDefaultPage }) => isDefaultPage
  ) as MetaPage;

  const defaultRoute = defaultPage.pageUrl;

  const [nextPage, setNextPage] = useState<MetaPage>(defaultPage);

  const currentPageData = pages.find(
    (page) => page.pageUrl === usePathname()
  ) as MetaPage;

  const nextPageData =
    pages[(pages.indexOf(currentPageData) + 1) % pages.length];

  useEffect(() => {
    setNextPage(nextPageData);
  }, [currentPageData, nextPageData.pageUrl]);

  const scrollPage = (ref: RefObject<HTMLElement>) =>
    ref.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  const changePage = () => {
    router.push(
      `${nextPage.pageUrl === defaultRoute ? defaultRoute : nextPage.pageUrl}`
    );
    if (ref) scrollPage(ref);
  };

  return {
    currentPath: currentPageData.pageUrl,
    nextPageUrl: nextPage.pageUrl,
    nextPageText: nextPage.title,
    changePage,
  } as const;
};

export default usePage;
