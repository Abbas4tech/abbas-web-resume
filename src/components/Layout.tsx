"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProfileCard from "./ProfileCard";
import AOS from "aos";
import { usePathname, useRouter } from "next/navigation";
import { useUserInfo } from "@context/useInfo";
import { FaArrowRight } from "react-icons/fa";
import { fetchUserInfo } from "@utils/api";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  console.log(process.env)
  const { pages, title } = useUserInfo();
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
      <Head>
        <title>Hello Worlds</title>
      </Head>
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
