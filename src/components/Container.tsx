import React from "react";
import { Entry, EntrySkeletonType, createClient } from "contentful";
import { contentful, getCommonInfo } from "@utils/data";
import { ContentType } from "@utils/enums";
import { CommonData } from "@utils/types";
import Sidebar from "./Sidebar";
import Header from "./Header";

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
        <Header commonData={commonData} />
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
