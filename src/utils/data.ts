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

 export const convertEntry = <T>(entry: Entry<T>): T => {
  const result = { ...entry.fields } as T; // Start with the fields of the entry

  // Iterate through each field in the entry
  for (const key in result) {
    const value = result[key];

    // Check if the value is an object and has a 'sys' property (indicating it's an Entry)
    if (value && typeof value === 'object' && value !== null) {
      if ('sys' in value) {
        // If it's a single Entry, convert it
        result[key] = convertEntry(value as unknown as Entry<any>);
      } else if (Array.isArray(value)) {
        // If it's an array, process each item
        result[key] = value.map(item => {
          if (item && typeof item === 'object' && 'sys' in item) {
            // Convert if the item is an Entry
            return convertEntry(item as unknown as Entry<any>);
          } else if (Array.isArray(item)) {
            // If it's an array, recursively convert each Entry within
            return item.map(subItem => {
              if (subItem && typeof subItem === 'object' && 'sys' in subItem) {
                return convertEntry(subItem as unknown as Entry<any>);
              }
              return subItem; // Return item as is if not an Entry
            });
          }
          return item; // Return item as is if not an Entry
        }) as any; // Use 'any' to avoid type errors
      }
    }
  }

  return result;
};

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
