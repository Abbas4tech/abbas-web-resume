import dynamic, { Loader } from "next/dynamic";
import { ComponentType } from "react";
import { IconType, IconBaseProps } from "react-icons";
import { IconLibrary, IconModule } from "../types";

/**
 * Mapping of icon libraries to their corresponding dynamic import functions.
 */
export const libraryImportPaths: Record<
  IconLibrary,
  () => Promise<IconModule>
> = {
  fa: () => import("react-icons/fa"),
  fa6: () => import("react-icons/fa6"),
  io: () => import("react-icons/io"),
  io5: () => import("react-icons/io5"),
  md: () => import("react-icons/md"),
  ri: () => import("react-icons/ri"),
  si: () => import("react-icons/si"),
};

/**
 * Dynamically loads an icon component from the specified library.
 * @param library - The icon library to import from.
 * @param iconName - The name of the icon to import.
 * @param loadingComponent - Optional React component to display while loading.
 * @returns A dynamically loaded React component for the icon.
 */
export const loadIcon = (
  library: IconLibrary,
  iconName: string
): ComponentType<IconBaseProps> => {
  const loader: Loader<IconBaseProps> = async () => {
    try {
      const iconModule: IconModule = await libraryImportPaths[library]();
      if (!iconModule[iconName]) {
        console.error(`Icon "${iconName}" not found in library "${library}"`);
        return () => null;
      }
      return iconModule[iconName] as IconType;
    } catch (error) {
      console.error(`Failed to load icons from library "${library}":`, error);
      return () => null;
    }
  };

  return dynamic<IconBaseProps>(() => loader(), {
    ssr: false,
  });
};