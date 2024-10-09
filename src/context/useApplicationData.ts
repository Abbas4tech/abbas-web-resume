import React, { useContext } from "react";
import { ApplicationContext } from "./ApplicationProvider";

const useApplicationData = () => {
  const context = useContext(ApplicationContext);
  if (context === null) {
    throw new Error("useUserInfo must be used within a DataProvider");
  }
  return context.data;
};
export default useApplicationData;
