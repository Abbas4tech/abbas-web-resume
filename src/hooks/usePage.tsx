import React, { useState, useEffect, RefObject } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useApplicationData } from "@context";

interface usePageProps {
  ref?: RefObject<HTMLElement>;
}

const usePage = ({ ref }: usePageProps) => {
  const router = useRouter();
  const { pages, defaultPage } = useApplicationData();
  const [nextPage, setNextPage] = useState<string>("");
  const currentPath =
    usePathname().charAt(1).toUpperCase() + usePathname().slice(2) ||
    defaultPage;
  const nextUrl = pages[(pages.indexOf(currentPath) + 1) % pages.length];

  useEffect(() => {
    setNextPage(nextUrl);
  }, [currentPath, nextUrl]);

  const scrollPage = (ref: RefObject<HTMLElement>) =>
    ref.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  const changePage = () => {
    router.push(
      `/${
        nextPage.toLowerCase() === defaultPage.toLowerCase()
          ? ""
          : nextPage.toLowerCase()
      }`
    );
    if (ref) scrollPage(ref);
  };

  return { currentPath, nextPage, changePage } as const;
};

export default usePage;
