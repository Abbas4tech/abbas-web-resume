"use client";
import React, { createContext, useState, ReactNode } from "react";
import { ApplicationData } from "@utils/contentful";

export const ApplicationContext = createContext<{
  data: ApplicationData;
} | null>(null);

interface DataProviderProps {
  children: ReactNode;
  initialData: ApplicationData;
}

const ApplicationDataProvider = ({
  children,
  initialData,
}: DataProviderProps) => {
  const [data] = useState<ApplicationData>(initialData);

  return (
    <ApplicationContext.Provider value={{ data }}>
      {children}
    </ApplicationContext.Provider>
  );
};
export default ApplicationDataProvider;
