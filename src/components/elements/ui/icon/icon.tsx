import { forwardRef, type HTMLAttributes, memo } from "react";
import { MdError } from "react-icons/md";
import { cn } from "@/lib/utils";
import { ICON_REGISTRY } from "./icon-map";

export type { IconLibrary, IconProps } from "./icon-map";

const LIBRARY_PREFIX_MAP: Record<string, string> = {
  Fa: "fa",
  Md: "md",
  Io: "io5",
  Si: "si",
  Pi: "pi",
  Vsc: "vsc",
  Ri: "ri",
};

function parseRawIconCode(iconCode: string) {
  const splitCode = iconCode.split("/");
  if (splitCode.length === 2) {
    return {
      library: splitCode[0],
      iconName: splitCode[1],
    };
  }
  if (splitCode.length === 1 && splitCode[0]) {
    const name = splitCode[0];
    const prefix = name.slice(0, 2);
    return {
      library: LIBRARY_PREFIX_MAP[prefix],
      iconName: name,
    };
  }
  return { library: undefined, iconName: undefined };
}

function parseIconCode(
  iconCode: string,
  propLibrary?: string,
  propIconName?: string
) {
  let resolvedLibrary = propLibrary;
  let resolvedIconName = propIconName;

  if (!(resolvedLibrary && resolvedIconName) && iconCode) {
    const parsed = parseRawIconCode(iconCode);
    resolvedLibrary = resolvedLibrary || parsed.library;
    resolvedIconName = resolvedIconName || parsed.iconName;
  }

  return { resolvedLibrary, resolvedIconName };
}

const Icon = memo(
  forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & {
      classes?: string[];
      color?: string;
      iconCode?: string;
      iconName?: string;
      library?: string;
      name?: string;
      showTooltip?: boolean;
      size?: string;
    }
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
      const { resolvedLibrary, resolvedIconName } = parseIconCode(
        iconCode,
        propLibrary,
        propIconName
      );

      const cleanClasses = (classes || []).map((c) => c.trim()).join(" ");
      const lookupKey = `${resolvedLibrary}/${resolvedIconName}`;
      const IconComponent = ICON_REGISTRY[lookupKey];

      if (!IconComponent) {
        if (resolvedLibrary || resolvedIconName) {
          console.error(`Icon not found in registry: "${lookupKey}"`);
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
