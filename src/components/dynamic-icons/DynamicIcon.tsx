import React, { memo, useMemo } from "react";
import { isIconLibrary } from "./utils/isIconLibrary";
import { loadIcon } from "./utils/loadIcon";
import { IconProps } from "./types";
import { MdError } from "react-icons/md";

/**
 * A React component that dynamically loads and renders an icon from react-icons.
 * @param props - The properties for the icon.
 * @returns A React element rendering the specified icon.
 */
const DynamicIcon: React.FC<IconProps> = memo(
  ({ iconCode, classes = [], showTooltip = true, name }) => {
    DynamicIcon.displayName = "DynamicIcon";

    const [library, iconName] = iconCode.split("/") as [string, string];

    const IconComponent = useMemo(() => {
      if (isIconLibrary(library)) {
        return loadIcon(library, iconName);
      } else {
        console.error(`Invalid icon library: "${library}"`);
        return MdError;
      }
    }, [library, iconName]);

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
