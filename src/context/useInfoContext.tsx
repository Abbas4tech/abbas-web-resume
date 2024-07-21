"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { createClient, Entry, EntrySkeletonType } from "contentful";
import { contentful, getCommonInfo } from "@utils/data"; // Ensure correct import paths
import { ContentType } from "@utils/enums"; // Ensure correct import paths
import { CommonData } from "@utils/types"; // Ensure correct import paths



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
