"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProfileCard from "./ProfileCard";
import * as AOS from "aos";
import { usePathname, useRouter } from "next/navigation";
import { useUserInfo } from "@context/useInfo";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  const { pages } = useUserInfo();
  const router = useRouter();
  const [next, setNext] = useState<string>("");
  const currentPath =
    usePathname().charAt(1).toUpperCase() + usePathname().slice(2);
  const nextPage = pages[(pages.indexOf(currentPath) + 1) % pages.length];
  useEffect(() => {
    setNext(nextPage);
  }, [currentPath]);

  const changePage = () => {
    router.push(`/${next.toLowerCase()}`);
  };

  AOS.init();
  return (
    <main className="w-full container overflow-hidden h-screen md:text-lg text-sm mx-auto">
      <Header />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content mx-4 mt-4 mb-[6rem] overflow-auto">
          <ProfileCard />
          {children}
          <button onClick={changePage} className="btn btn-primary mb-14">
            {next}
          </button>
        </div>
        <Sidebar />
      </div>
    </main>
  );
};

export default Container;
