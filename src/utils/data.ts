import { ChainModifiers, Entry, EntrySkeletonType } from "contentful";
import { contentfulConfig } from "../config/contentful";
import { Theme } from "./enums";
import {
  UserInfo,
  ContentFulInfo,
  Themes,
  ExperiencePage,
  Experience,
} from "./types";

export const themes: Themes = [Theme.DARK, Theme.LIGHT];

export const contentful: ContentFulInfo = contentfulConfig;

export const getUserInfo = (response: any): UserInfo => {
  console.log(response);
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
    pages: ["About", ...response.fields.pages],
    info: response.fields.info,
  } as UserInfo;
  return data;
};

export const mapExperiencePage = (fields: any): ExperiencePage => {
  return {
    title: fields.title,
    experiences: fields.experiences.map(
      ({ fields }: { fields: any }) =>
        ({
          company: fields.company,
          description: fields.description,
          position: fields.position,
          workedRemotely: fields.workedRemotely,
          startDate: fields.startDate,
          endDate: fields.endDate,
          location: fields.location,
          currentlyWorking: fields.currentlyWorking,
        } as Experience)
    ),
  };
};
