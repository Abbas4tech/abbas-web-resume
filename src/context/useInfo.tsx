"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserInfo } from "@utils/types";

const DataContext = createContext<{ data: UserInfo } | null>(null);

interface DataProviderProps {
  children: ReactNode;
  initialData: UserInfo;
}

export const DataProvider = ({ children, initialData }: DataProviderProps) => {
  const [data] = useState<UserInfo>(initialData);

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(DataContext);
  if (context === null) {
    throw new Error("useUserInfo must be used within a DataProvider");
  }
  return context.data;
};
