import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import { MetaPage } from "@/types/entries";

interface usePageProps {
  pages: MetaPage[];
}

interface usePageReturn {
  currentPageData: MetaPage;
  nextPage: MetaPage;
  defaultPage: MetaPage;
  changePage: () => void;
  pages: MetaPage[];
}

const usePage = ({ pages }: usePageProps): usePageReturn => {
  const router = useRouter();
  const currentPath = usePathname();

  const { currentPageData, nextPageData, defaultPage } = useMemo(() => {
    const defaultPage =
      pages.find(({ isDefaultPage }) => isDefaultPage) || pages[0];
    const currentPageData =
      pages.find((page) => page.pageUrl === currentPath) || defaultPage;
    const nextPageData =
      pages[(pages.indexOf(currentPageData) + 1) % pages.length];

    return { currentPageData, nextPageData, defaultPage };
  }, [pages, currentPath]);

  const changePage = useCallback(() => {
    router.push(
      nextPageData.pageUrl === defaultPage.pageUrl
        ? defaultPage.pageUrl
        : nextPageData.pageUrl
    );
  }, [nextPageData, defaultPage, router]);

  return {
    currentPageData,
    nextPage: nextPageData,
    defaultPage,
    changePage,
    pages,
  };
};

export default usePage;
export type { usePageProps };
