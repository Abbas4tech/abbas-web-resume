import { Entry, EntrySkeletonType } from "contentful";
import {
  Inter,
  Poppins,
  Jura,
  Space_Grotesk,
  Montserrat,
} from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

type Providers = "inter" | "poppins" | "jura" | "montserrat" | "spaceGrotesk";

const jura = Jura({
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400"],
});

const fontMap: Record<Providers, NextFont> = {
  inter,
  poppins,
  jura,
  spaceGrotesk,
  montserrat,
};

const checkIfValid = (str: string): str is Providers =>
  str === "inter" ||
  str === "poppins" ||
  str === "jura" ||
  str === "montserrat" ||
  str === "spaceGrotesk";

export const getFont = (st: string) => {
  const c = checkIfValid(st);
  if (c) {
    return fontMap[st];
  } else {
    return fontMap["poppins"];
  }
};

export const convertEntry = <T extends EntrySkeletonType>(
  entry: Entry<T>
): T => {
  const result = { ...entry.fields } as T;
  for (const key in result) {
    const value = result[key];

    if (value && typeof value === "object" && value !== null) {
      if ("sys" in value) {
        result[key] = convertEntry(value as unknown as Entry<any>);
      } else if (Array.isArray(value)) {
        result[key] = value.map((item) => {
          if (item && typeof item === "object" && "sys" in item) {
            return convertEntry(item as unknown as Entry<any>);
          } else if (Array.isArray(item)) {
            return item.map((subItem) => {
              if (subItem && typeof subItem === "object" && "sys" in subItem) {
                return convertEntry(subItem as unknown as Entry<any>);
              }
              return subItem;
            });
          }
          return item;
        }) as any;
      }
    }
  }

  return result;
};
