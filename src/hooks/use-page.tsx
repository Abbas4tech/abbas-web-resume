import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

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
