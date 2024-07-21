"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { createClient, Entry, EntrySkeletonType } from "contentful";
import { contentful, getCommonInfo } from "@utils/data"; // Ensure correct import paths
import { ContentType } from "@utils/enums"; // Ensure correct import paths
import { CommonData } from "@utils/types"; // Ensure correct import paths

// Function to fetch data from Contentful
export const fetchData = async (): Promise<CommonData> => {
  const client = createClient({
    accessToken: contentful.accessToken,
    space: contentful.space,
  });

  try {
    const response = await client.getEntries({
      content_type: ContentType.USERINFO,
    });

    return getCommonInfo(
      response.items[0] as Entry<EntrySkeletonType, undefined, string>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return {} as CommonData;
  }
};

console.log("fetchData Exported:", fetchData); // Add a console log to verify export

// Define the context and provider
const DataContext = createContext<{ data: CommonData } | null>(null);

interface DataProviderProps {
  children: ReactNode;
  initialData: CommonData;
}

export const DataProvider = ({ children, initialData }: DataProviderProps) => {
  const [data] = useState<CommonData>(initialData);

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useUserInfo = () => {
  const context = useContext(DataContext);
  if (context === null) {
    throw new Error("useUserInfo must be used within a DataProvider");
  }
  return context.data;
};
