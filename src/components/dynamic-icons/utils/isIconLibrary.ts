import { IconLibrary } from "../types";

export const isIconLibrary = (library: string): library is IconLibrary => {
  const libraries: IconLibrary[] = ["fa", "fa6", "io", "io5", "md", "ri", "si"];

  return libraries.includes(library as IconLibrary);
};
