import React, { memo, useMemo } from "react";
import { isIconLibrary } from "./isIconLibrary";
import { loadIcon } from "./loadIcon";
import { IconProps } from "./types";

/**
 * A React component that dynamically loads and renders an icon from react-icons.
 * @param props - The properties for the icon.
 * @returns A React element rendering the specified icon.
 */
const DynamicIcon: React.FC<IconProps> = memo(
  ({ iconCode, classes = [], showTooltip = true, name }) => {
    DynamicIcon.displayName = "DynamicIcon";

    const [library, iconName] = iconCode.split("/") as [string, string];

    if (!isIconLibrary(library)) {
      console.error(`Invalid icon library: "${library}"`);
      return null;
    }

    const IconComponent = useMemo(
      () => loadIcon(library, iconName),
      [library, iconName]
    );

    const iconClasses = "flex items-center";

    return (
      <div
        className={
          showTooltip ? `${iconClasses} tooltip tooltip-primary` : iconClasses
        }
        data-tip={name}
      >
        <IconComponent
          className={classes.join(" ")}
          aria-label={name}
          role="img"
        />
      </div>
    );
  }
);

export default DynamicIcon;
