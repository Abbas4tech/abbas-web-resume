import React from "react";
import { Entry, EntrySkeletonType, createClient } from "contentful";
import Navbar from "../../src/components/Navbar";
import { contentful, getCommonInfo } from "../../src/utils/data";
import { ContentType } from "../../src/utils/enums";
import { Themes, CommonData } from "../../src/utils/types";
import Sidebar from "./Sidebar";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = async ({ children }: ContainerProps) => {
  const client = createClient({
    accessToken: contentful.accessToken,
    space: contentful.space,
  });

  let commonData: CommonData = {} as CommonData;

  try {
    const response = await client.getEntries({
      content_type: ContentType.USERINFO,
    });

    commonData = getCommonInfo(
      response.items[0] as Entry<EntrySkeletonType, undefined, string>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    commonData = {} as CommonData;
  }

  return (
    <>
      <main className="w-full container h-screen md:text-lg overflow-hidden text-sm mx-auto">
        <header>
          <nav className="navbar bg-base-100 h-10 md:h-20">
            <div className="navbar-start">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle drawer-button lg:hidden"
                htmlFor="my-drawer-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </label>

              <h1 className="text-lg normal-case lg:text-2xl p-2">
                {commonData.title}
              </h1>
            </div>

            <div className="navbar-end">
              <Navbar themes={commonData.themes} />
            </div>
          </nav>
        </header>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center bg-base-200">
            {/* Page content here */}
            <h1>Abbas Content</h1>
            {children}
          </div>
          <Sidebar pages={commonData.pages} />
        </div>
      </main>
    </>
  );
};

export default Container;
