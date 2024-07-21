"use client";
import React, { useEffect, useState } from "react";
import { Entry, EntrySkeletonType, createClient } from "contentful";
import { contentful, getCommonInfo } from "@utils/data";
import { ContentType } from "@utils/enums";
import { CommonData } from "@utils/types";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { DataProvider, fetchData } from "src/context/useInfoContext";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  const [data, setData] = useState<CommonData | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const initialData = await fetchData();
      setData(initialData);
    };

    fetchDataAsync();
  }, []);

  const loading = Array.from({ length: 3 }).map((e) => (
    <span className="loading loading-ball loading-lg"></span>
  ));

  if (!data) {
    return loading;
  }

  return (
    <DataProvider initialData={data}>
      <main className="w-full container h-screen md:text-lg overflow-hidden text-sm mx-auto">
        <Header />
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center bg-base-200">
            {/* Page content here */}
            <h1>Abbas Content</h1>
            {children}
          </div>
          <Sidebar />
        </div>
      </main>
    </DataProvider>
  );
};

export default Container;
