"use client";
import React from "react";
import { fetchAboutUsPage } from "@utils/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const about = async () => {
  const data = await fetchAboutUsPage();
  console.log(data[1].items[0].fields);
  return <div>{documentToReactComponents(data?.fields?.bio)}</div>;
};

export default about;
