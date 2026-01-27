import dynamic, { type Loader } from "next/dynamic";
import { type ComponentType, forwardRef, type HTMLAttributes, memo, useMemo } from "react";
import type { IconBaseProps, IconType } from "react-icons";
import { cn } from "@/lib/utils";
import type { Icon as IconResponse } from "@/types/common";

type IconLibrary = "fa" | "fa6" | "io" | "io5" | "md" | "ri" | "si";

interface IconModule {
  [key: string]: IconType | unknown;
  default?: unknown;
}

const libraryImportPaths: Record<IconLibrary, () => Promise<IconModule>> = {
  fa: () => import("react-icons/fa"),
  fa6: () => import("react-icons/fa6"),
  io: () => import("react-icons/io"),
  io5: () => import("react-icons/io5"),
  md: () => import("react-icons/md"),
  ri: () => import("react-icons/ri"),
  si: () => import("react-icons/si"),
};

export const loadIcon = (library: IconLibrary, iconName: string): ComponentType<IconBaseProps> => {
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

  return dynamic<IconBaseProps>(() => loader());
};

const isIconLibrary = (library: string): library is IconLibrary => {
  const libraries: IconLibrary[] = ["fa", "fa6", "io", "io5", "md", "ri", "si"];

  return libraries.includes(library as IconLibrary);
};

const Icon = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & IconResponse>(
    ({ className, iconCode = "", classes, showTooltip = true, name }, ref) => {
      const [library, iconName] = iconCode.split("/") as [string, string];
      const cleanClasses = (classes || []).map((c: string) => c.trim()).join(" ");

      const IconComponent = useMemo(() => {
        if (isIconLibrary(library)) {
          return loadIcon(library, iconName);
        }
        console.error(`Invalid icon library: "${library}"`);
        return loadIcon("md", "MdError");
      }, [library, iconName]);

      return (
        <div
          className={cn("flex items-center", showTooltip && "tooltip tooltip-primary", className)}
          {...(showTooltip && name ? { "data-tip": name } : {})}
          ref={ref}
        >
          <IconComponent aria-label={name} className={cleanClasses} role="img" />
        </div>
      );
    }
  )
);

Icon.displayName = "DynamicIcon";

export { Icon };
