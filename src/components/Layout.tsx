"use client";
import React, { useEffect, PropsWithChildren, useRef } from "react";
import { Header, Sidebar, ProfileCard, DynamicIcon } from "@components";
import AOS from "aos";
import { usePage } from "@hooks";

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const { nextPageText, changePage } = usePage({ ref: layoutRef });

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init();
    }
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          height: "calc(100vh - 5rem)",
        }}
        className="w-full container overflow-hidden md:text-lg h-[calc(100vh - 5rem)] text-sm mx-auto"
      >
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
      </div>
    </>
  );
};

export default Layout;
