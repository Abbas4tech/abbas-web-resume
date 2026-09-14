import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { usePageTransition } from "./use-page-transition";

export interface PageLike {
  isDefaultPage?: boolean;
  pageUrl: string;
}

interface usePageProps<T extends PageLike> {
  pages: T[];
}

interface usePageReturn<T extends PageLike> {
  changePage: () => void;
  currentPageData: T;
  defaultPage: T;
  nextPage: T;
  pages: T[];
}

const usePage = <T extends PageLike>({
  pages,
}: usePageProps<T>): usePageReturn<T> => {
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

  const { navigateWithTransition } = usePageTransition();

  const changePage = useCallback(() => {
    navigateWithTransition(
      nextPageData.pageUrl === defaultPage.pageUrl
        ? defaultPage.pageUrl
        : nextPageData.pageUrl
    );
  }, [nextPageData, defaultPage, navigateWithTransition]);

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
