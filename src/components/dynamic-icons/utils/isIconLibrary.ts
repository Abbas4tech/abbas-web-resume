import { IconLibrary } from "../types";

/**
 * Checks if the provided library name is a valid IconLibrary.
 * @param library - The library name to check.
 * @returns True if valid, false otherwise.
 */
export const isIconLibrary = (library: string): library is IconLibrary => {
  const libraries: IconLibrary[] = [
    "ai",
    "bi",
    "bs",
    "cg",
    "ci",
    "di",
    "fa",
    "fa6",
    "fc",
    "fi",
    "gi",
    "go",
    "gr",
    "hi",
    "hi2",
    "im",
    "io",
    "io5",
    "lia",
    "lib",
    "lu",
    "md",
    "pi",
    "ri",
    "rx",
    "si",
    "sl",
    "tb",
    "tfi",
    "ti",
    "vsc",
    "wi",
  ];

  return libraries.includes(library as IconLibrary);
};
