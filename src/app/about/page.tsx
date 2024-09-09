import React from "react";
import { fetchAboutUsPage, fetchCommonCMS } from "@utils/api";

const about = async () => {
  const data = await fetchCommonCMS();
  return <div></div>;
};

export default about;
