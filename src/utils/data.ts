import { ChainModifiers, Entry, EntrySkeletonType } from "contentful";
import { contentfulConfig } from "../config/contentful";
import { Theme } from "./enums";
import { UserInfo, ContentFulInfo, Themes } from "./types";

export const themes: Themes = [Theme.DARK, Theme.LIGHT];

export const contentful: ContentFulInfo = contentfulConfig;

export const getUserInfo = (response: any): UserInfo => {
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
    themes: response?.fields?.themeList as Themes,
    pages: response.fields.pages,
    bio: response.fields.bio,
    icon: response.fields.html5
  } as UserInfo;
  return data;
};
