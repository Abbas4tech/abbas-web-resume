"use client";
import React, { useState, useEffect, PropsWithChildren } from "react";
import { User } from "@utils/contentful";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProfileCard from "./ProfileCard";
import AOS from "aos";
import { usePathname, useRouter } from "next/navigation";
import { useUserInfo } from "@context/useInfo";
import { FaArrowRight } from "react-icons/fa";
import {
  fetchExperiencePage,
  fetchSkillsPage,
  fetchUserInfo,
  fetchProjectsPage,
} from "@utils/api";
import Head from "next/head";

interface LayoutProps {
  basePageLayout: User;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
  basePageLayout,
}) => {
  const { pages, title, resume, themeList, profilePicture } = basePageLayout;
  const router = useRouter();
  const [nextPage, setNextPage] = useState<string>("");
  const currentPath =
    usePathname().charAt(1).toUpperCase() + usePathname().slice(2) || "About";
  const nextUrl = pages[(pages.indexOf(currentPath) + 1) % pages.length];

  useEffect(() => {
    setNextPage(nextUrl);
  }, [currentPath, nextUrl]);

  // Initialize AOS only on the client
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
        <Header title={title} resume={resume} themes={themeList} />
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content mx-4 mt-4 mb-[6rem] overflow-auto scrollbar-hide">
            <ProfileCard profilePicture={profilePicture} />
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
          <Sidebar pages={pages} />
        </div>
      </main>
    </>
  );
};

export default Layout;
