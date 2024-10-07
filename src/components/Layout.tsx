"use client";
import React, { useEffect, PropsWithChildren, useRef } from "react";
import { Header, Sidebar } from "@components";
import AOS from "aos";
import { FaArrowRight } from "react-icons/fa";
import { usePage } from "@hooks";

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const { nextPage, changePage } = usePage({ ref: layoutRef });

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init();
    }
  }, []);

  return (
    <>
      <Header />
      <div className="w-full container overflow-hidden h-[89vh] md:text-lg text-sm mx-auto">
        <div className={"drawer lg:drawer-open"}>
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div
            ref={layoutRef}
            className="drawer-content mx-4 mt-4 overflow-auto scrollbar-hide"
          >
            {children}
            <div className="flex justify-end p-4">
              <button
                onClick={changePage}
                className="gap-2 text-sm capitalize text-base-content bg-base-300 md:text-base btn-sm md:btn-md btn"
              >
                {nextPage}
                <FaArrowRight />
              </button>
            </div>
          </div>
          <Sidebar changePage={changePage} />
        </div>
      </div>
    </>
  );
};

export default Layout;
