import dynamic, { Loader } from "next/dynamic";
import { ComponentType } from "react";
import { IconType, IconBaseProps } from "react-icons";
import { IconLibrary, IconModule } from "./types";

/**
 * Mapping of icon libraries to their corresponding dynamic import functions.
 */
export const libraryImportPaths: Record<
  IconLibrary,
  () => Promise<IconModule>
> = {
  ai: () => import("react-icons/ai"),
  bi: () => import("react-icons/bi"),
  bs: () => import("react-icons/bs"),
  cg: () => import("react-icons/cg"),
  ci: () => import("react-icons/ci"),
  di: () => import("react-icons/di"),
  fa: () => import("react-icons/fa"),
  fa6: () => import("react-icons/fa6"),
  fc: () => import("react-icons/fc"),
  fi: () => import("react-icons/fi"),
  gi: () => import("react-icons/gi"),
  go: () => import("react-icons/go"),
  gr: () => import("react-icons/gr"),
  hi: () => import("react-icons/hi"),
  hi2: () => import("react-icons/hi2"),
  im: () => import("react-icons/im"),
  io: () => import("react-icons/io"),
  io5: () => import("react-icons/io5"),
  lia: () => import("react-icons/lia"),
  lib: () => import("react-icons/lib"),
  lu: () => import("react-icons/lu"),
  md: () => import("react-icons/md"),
  pi: () => import("react-icons/pi"),
  ri: () => import("react-icons/ri"),
  rx: () => import("react-icons/rx"),
  si: () => import("react-icons/si"),
  sl: () => import("react-icons/sl"),
  tb: () => import("react-icons/tb"),
  tfi: () => import("react-icons/tfi"),
  ti: () => import("react-icons/ti"),
  vsc: () => import("react-icons/vsc"),
  wi: () => import("react-icons/wi"),
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
      const module: IconModule = await libraryImportPaths[library]();
      if (!module[iconName]) {
        console.error(`Icon "${iconName}" not found in library "${library}"`);
        return () => null;
      }
      return module[iconName] as IconType;
    } catch (error) {
      console.error(`Failed to load icons from library "${library}":`, error);
      return () => null;
    }
  };

  return dynamic<IconBaseProps>(() => loader(), {
    ssr: false,
  });
};
