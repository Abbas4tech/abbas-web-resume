"use client";
import React, { useState, useEffect, PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Header, ProfileCard, Sidebar } from "@components";
import AOS from "aos";
import { FaArrowRight } from "react-icons/fa";
import { useApplicationData } from "@context/useApplication";
import { fetchApplicationData } from "@utils/api";

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { pages } = useApplicationData();
  const router = useRouter();
  const [nextPage, setNextPage] = useState<string>("");
  const currentPath =
    usePathname().charAt(1).toUpperCase() + usePathname().slice(2) || "About";
  const nextUrl = pages[(pages.indexOf(currentPath) + 1) % pages.length];

  useEffect(() => {
    setNextPage(nextUrl);
  }, [currentPath, nextUrl]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init();
    }
  }, []);

  const changePage = () =>
    router.push(
      `/${nextPage.toLowerCase() === "about" ? "" : nextPage.toLowerCase()}`
    );

  return (
    <>
      <main className="w-full container overflow-hidden h-screen md:text-lg text-sm mx-auto">
        <Header />
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content mx-4 mt-4 mb-[6rem] overflow-auto scrollbar-hide">
            <ProfileCard />
            {children}
            <div className="flex justify-end mb-14 p-2">
              <button
                onClick={changePage}
                className="gap-2 text-sm capitalize text-base-content bg-base-300 md:text-base btn-sm md:btn-md btn"
              >
                {nextPage}
                <FaArrowRight />
              </button>
            </div>
          </div>
          <Sidebar />
        </div>
      </main>
    </>
  );
};

export default Layout;
