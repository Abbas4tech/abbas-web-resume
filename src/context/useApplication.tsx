"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ApplicationData } from "@utils/contentful";
const ApplicationContext = createContext<{ data: ApplicationData } | null>(null);

interface DataProviderProps {
  children: ReactNode;
  initialData: ApplicationData;
}

export const ApplicationDataProvider = ({
  children,
  initialData,
}: DataProviderProps) => {
  const [data] = useState<ApplicationData>(initialData);

  return (
    <ApplicationContext.Provider value={{ data }}>{children}</ApplicationContext.Provider>
  );
};

export const useApplicationData = () => {
  const context = useContext(ApplicationContext);
  if (context === null) {
    throw new Error("useUserInfo must be used within a DataProvider");
  }
  return context.data;
};
