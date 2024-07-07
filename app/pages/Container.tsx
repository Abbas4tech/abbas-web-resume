import React from "react";
import { Entry, EntrySkeletonType, createClient } from "contentful";
import Navbar from "../components/Navbar";
import { contentful, getCommonInfo } from "../utils/data";
import { ContentType } from "../utils/enums";
import { Themes, CommonData } from "../utils/types";

const Container = async () => {
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
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <h1 className=" text-2xl mx-2 flex-1 px-2 text-primary">
            {commonData.title}
          </h1>
          <div className="hidden flex-none lg:flex items-center">
            <Navbar themes={commonData.themes} />
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Container;
