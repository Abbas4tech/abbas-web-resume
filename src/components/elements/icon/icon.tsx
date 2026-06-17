import dynamic from "next/dynamic";
import { forwardRef, type HTMLAttributes, memo } from "react";
import type { IconBaseProps, IconType } from "react-icons";
import { MdError } from "react-icons/md";
import { cn } from "@/lib/utils";

export type IconLibrary =
  | "fa"
  | "fa6"
  | "io"
  | "io5"
  | "md"
  | "ri"
  | "si"
  | "pi";

/** Plain props contract for the Icon element. No Contentful types. */
export interface IconProps {
  /** Extra CSS classes passed to the inner icon component */
  classes?: string[];
  /** Hex color string e.g., '#000' */
  color?: string;
  /** Format: "library/IconName" e.g. "io5/IoMenu" (legacy fallback) */
  iconCode?: string;
  /** The icon name e.g., 'PiFlagBannerFill' */
  iconName?: string;
  /** The icon library e.g., 'pi' */
  library?: string;
  /** Accessible name / tooltip text */
  name?: string;
  /** Whether to show a tooltip on hover */
  showTooltip?: boolean;
  size?: string;
}

interface IconModule {
  [key: string]: IconType;
}

const libraryImportPaths: Record<IconLibrary, () => Promise<IconModule>> = {
  fa: () => import("react-icons/fa") as unknown as Promise<IconModule>,
  fa6: () => import("react-icons/fa6") as unknown as Promise<IconModule>,
  io: () => import("react-icons/io") as unknown as Promise<IconModule>,
  io5: () => import("react-icons/io5") as unknown as Promise<IconModule>,
  md: () => import("react-icons/md") as unknown as Promise<IconModule>,
  pi: () => import("react-icons/pi") as unknown as Promise<IconModule>,
  ri: () => import("react-icons/ri") as unknown as Promise<IconModule>,
  si: () => import("react-icons/si") as unknown as Promise<IconModule>,
};

type IconRendererProps = IconBaseProps & {
  iconName: string;
};

function makeIconRenderer(loader: () => Promise<IconModule>, library: string) {
  return dynamic<IconRendererProps>(
    () =>
      loader().then((mod) => ({
        default({ iconName, ...rest }: IconRendererProps) {
          const IconComp = mod[iconName];
          if (!IconComp) {
            console.error(
              `Icon "${iconName}" not found in library "${library}"`
            );
            return <MdError {...rest} />;
          }
          return <IconComp {...rest} />;
        },
      })),
    { ssr: true }
  );
}

const DYNAMIC_ICON_COMPONENTS: Record<
  string,
  ReturnType<typeof makeIconRenderer>
> = {
  fa: makeIconRenderer(libraryImportPaths.fa, "fa"),
  fa6: makeIconRenderer(libraryImportPaths.fa6, "fa6"),
  io: makeIconRenderer(libraryImportPaths.io, "io"),
  io5: makeIconRenderer(libraryImportPaths.io5, "io5"),
  md: makeIconRenderer(libraryImportPaths.md, "md"),
  pi: makeIconRenderer(libraryImportPaths.pi, "pi"),
  ri: makeIconRenderer(libraryImportPaths.ri, "ri"),
  si: makeIconRenderer(libraryImportPaths.si, "si"),
};

const isIconLibrary = (library: string): library is IconLibrary =>
  library in DYNAMIC_ICON_COMPONENTS;

const Icon = memo(
  forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & Partial<IconProps>
  >(
    (
      {
        className,
        iconCode = "",
        library: propLibrary,
        iconName: propIconName,
        color,
        classes,
        showTooltip = true,
        name,
        size = "24",
      },
      ref
    ) => {
      const splitCode = iconCode.split("/");
      const resolvedLibrary = propLibrary || splitCode[0];
      const resolvedIconName = propIconName || splitCode[1];
      const cleanClasses = (classes || []).map((c) => c.trim()).join(" ");

      const IconComponent =
        resolvedLibrary && isIconLibrary(resolvedLibrary)
          ? DYNAMIC_ICON_COMPONENTS[resolvedLibrary]
          : null;

      if (!IconComponent) {
        if (resolvedLibrary) {
          console.error(`Invalid icon library: "${resolvedLibrary}"`);
        }
        return (
          <div
            className={cn(
              "flex items-center",
              showTooltip && "tooltip tooltip-primary",
              className
            )}
            data-tip={name}
            ref={ref}
            tabIndex={-1}
          >
            <MdError
              aria-label={name}
              className={cleanClasses}
              role="img"
              style={color ? { color } : undefined}
            />
          </div>
        );
      }

      return (
        <div
          className={cn(
            "flex items-center",
            showTooltip && "tooltip tooltip-primary",
            className
          )}
          data-tip={name}
          ref={ref}
          tabIndex={-1}
        >
          <IconComponent
            aria-label={name}
            className={cleanClasses}
            iconName={resolvedIconName || ""}
            role="img"
            size={size}
            style={color ? { color } : undefined}
          />
        </div>
      );
    }
  )
);

Icon.displayName = "DynamicIcon";

export { Icon };
