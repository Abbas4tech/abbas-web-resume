import { ChainModifiers, Entry, EntrySkeletonType } from "contentful";
import { contentfulConfig } from "../config/contentful";
import { Theme } from "./enums";
import { CommonData, ContentFulInfo, Themes } from "./types";

export const themes: Themes = [Theme.DARK, Theme.LIGHT];

export const contentful: ContentFulInfo = contentfulConfig;

export const getCommonInfo = (
  response: Entry<EntrySkeletonType, ChainModifiers, any>
): CommonData => {
  const data = {
    title: response.fields.title,
    role: response.fields.role,
    profilePic: {
      width: response?.fields?.profilePicture?.fields.file.details.image
        .width as number,
      height: response?.fields?.profilePicture?.fields.file.details.image
        .height as number,
      src: response?.fields?.profilePicture?.fields.file.url,
    },
    resume: {
      src: response?.fields?.resume?.fields.file.url,
      title: response?.fields?.resume?.fields.title,
      description: response?.fields?.resume?.fields.description,
    },
    themes: response?.fields?.themes as Themes,
  } as CommonData;
  console.log(data);
  return data;
};
