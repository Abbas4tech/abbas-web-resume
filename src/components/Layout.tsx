"use client";
import React, { useEffect, PropsWithChildren, useRef } from "react";
import { Header, Sidebar, ProfileCard, DynamicIcon } from "@components";
import { usePage } from "@hooks";
import AOS from "aos";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const { nextPageText, changePage } = usePage({ ref: layoutRef });

  useEffect(() => {
    if (typeof window !== "undefined") AOS.init();
  }, []);

  return (
    <>
      <Header />
      <main className="w-full wrapper container overflow-hidden md:text-lg text-sm mx-auto">
        <div className={"drawer lg:drawer-open"}>
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div
            ref={layoutRef}
            className="drawer-content p-4 overflow-auto scrollbar-hide"
          >
            <ProfileCard />
            {children}
            <div className="flex justify-end pb-12">
              <button
                onClick={changePage}
                className="gap-2 text-sm capitalize text-base-content bg-base-300 md:text-base btn-sm md:btn-md btn"
              >
                {nextPageText}
                <DynamicIcon
                  classes={[]}
                  showTooltip={false}
                  name="Next Page"
                  iconCode="fa/FaArrowRight"
                />
              </button>
            </div>
          </div>
          <Sidebar changePage={changePage} />
        </div>
      </main>
    </>
  );
};

export default Layout;
