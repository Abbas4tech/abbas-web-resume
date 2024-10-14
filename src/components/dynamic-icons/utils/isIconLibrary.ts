import { IconLibrary } from "../types";

/**
 * Checks if the provided library name is a valid IconLibrary.
 * @param library - The library name to check.
 * @returns True if valid, false otherwise.
 */
export const isIconLibrary = (library: string): library is IconLibrary => {
  const libraries: IconLibrary[] = [
    "fa",
    "fa6",
    "io",
    "io5",
    "md",
    "ri",
    "si",
  ];

  return libraries.includes(library as IconLibrary);
};
