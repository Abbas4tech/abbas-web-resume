"use client";
import React, { createContext, useState, PropsWithChildren } from "react";
import { ApplicationData } from "@lib/contentful";

export const ApplicationContext = createContext<{
  data: ApplicationData;
} | null>(null);

interface DataProviderProps extends PropsWithChildren {
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
