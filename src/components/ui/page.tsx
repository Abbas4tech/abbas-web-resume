"use client";
import React from "react";
import { cn } from "@lib/utils";
import { MetaPage } from "@lib/contentful";
import { usePathname, useRouter } from "next/navigation";
import { Button, TypeButtonProps } from "./button";
import { Icon } from "./icon";

type PageContext = {
  pages: MetaPage[];
  currentPath: string;
  nextPageUrl: string;
  nextPageText: string;
  defaultPage: MetaPage;
  changePage: () => void;
  withPageChange: boolean;
};

const PageContext = React.createContext<PageContext | null>(null);

function usePage() {
  const context = React.useContext(PageContext);
  if (!context) {
    throw new Error("usePage must be used within a PageProvider.");
  }
  return context;
}

const PageProvider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    pages: MetaPage[];
    withPageChange?: boolean;
  }
>(
  (
    { className, pages = [], withPageChange = true, children, ...props },
    ref
  ) => {
    const router = useRouter();

    const defaultPage =
      pages.find(({ isDefaultPage }) => isDefaultPage) || pages[0];
    const defaultRoute = defaultPage.pageUrl;

    const [nextPage, setNextPage] = React.useState<MetaPage>(defaultPage);

    const currentPath = usePathname();

    const currentPageData =
      pages.find((page) => page.pageUrl === currentPath) || defaultPage;

    const nextPageData =
      pages[(pages.indexOf(currentPageData) + 1) % pages.length];

    React.useEffect(() => {
      setNextPage(nextPageData);
    }, [currentPageData, nextPageData]);

    const changePage = React.useCallback(() => {
      router.push(
        `${nextPage.pageUrl === defaultRoute ? defaultRoute : nextPage.pageUrl}`
      );
    }, [nextPage, defaultRoute, router]);

    const context = React.useMemo<PageContext>(
      () => ({
        pages,
        changePage,
        currentPath: currentPageData.pageUrl,
        defaultPage,
        nextPageText: nextPage.title,
        nextPageUrl: nextPage.pageUrl,
        withPageChange,
      }),
      [
        currentPageData,
        nextPage,
        defaultPage,
        changePage,
        withPageChange,
        pages,
      ]
    );

    return (
      <PageContext.Provider value={context} {...props}>
        {children}
      </PageContext.Provider>
    );
  }
);

PageProvider.displayName = "PageProvider";

const Page = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
      const { withPageChange } = usePage();
      return (
        <div
          role="main"
          ref={ref}
          className={cn(
            "group-data-[variant='responsive-sidebar']:container overflow-auto scrollbar-hide flex flex-col",
            className
          )}
          {...props}
        >
          {children}
          {withPageChange && <PageChangeButton data-with-page-change={true} />}
        </div>
      );
    }
  )
);

Page.displayName = "Page";

const PageContent = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("", className)} {...props} />
    )
  )
);

PageContent.displayName = PageContent.displayName;

const PageHeading = React.memo(
  React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
  >(({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4 p-4 px-0 text-xl font-bold md:py-6 md:text-4xl",
        className
      )}
      {...props}
    />
  ))
);
PageHeading.displayName = "PageHeading";

const PageChangeButton = React.memo<Omit<TypeButtonProps, "ref">>(
  ({ className, ...props }) => {
    const { changePage, nextPageText } = usePage();
    return (
      <Button
        className={cn("mt-4 justify-self-end self-end", className)}
        onClick={changePage}
        {...props}
      >
        {nextPageText}
        <Icon
          classes={[]}
          showTooltip={false}
          name="Next Page"
          iconCode="fa/FaArrowRight"
        />
      </Button>
    );
  }
);
PageChangeButton.displayName = "PageChangeButton";

export {
  PageProvider,
  Page,
  PageHeading,
  PageContent,
  PageChangeButton,
  usePage,
};
