"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@utils/contentful";
const DataContext = createContext<{ data: User } | null>(null);

interface DataProviderProps {
  children: ReactNode;
  initialData: User;
}

export const DataProvider = ({ children, initialData }: DataProviderProps) => {
  const [data] = useState<User>(initialData);

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
