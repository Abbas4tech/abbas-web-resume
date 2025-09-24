import React from "react";
import { IconType, IconBaseProps } from "react-icons";
import dynamic, { Loader } from "next/dynamic";
import { cn } from "@/lib/utils";
import { Icon as IconResponse } from "@/types/common";

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

export const loadIcon = (
  library: IconLibrary,
  iconName: string
): React.ComponentType<IconBaseProps> => {
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

const Icon = React.memo(
  React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & IconResponse
  >(({ className, iconCode = "", classes, showTooltip = true, name }, ref) => {
    const [library, iconName] = iconCode.split("/") as [string, string];
    const cleanClasses = (classes || []).map((c) => c.trim()).join(" ");

    const IconComponent = React.useMemo(() => {
      if (isIconLibrary(library)) {
        return loadIcon(library, iconName);
      } else {
        console.error(`Invalid icon library: "${library}"`);
        return loadIcon("md", "MdError");
      }
    }, [library, iconName]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          showTooltip && `tooltip tooltip-primary`,
          className
        )}
        tabIndex={-1}
        data-tip={name}
      >
        <IconComponent className={cleanClasses} aria-label={name} role="img" />
      </div>
    );
  })
);

Icon.displayName = "DynamicIcon";

export { Icon };
