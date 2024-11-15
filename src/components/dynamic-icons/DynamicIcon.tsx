import React, { memo, useMemo } from "react";
import { isIconLibrary } from "./utils/isIconLibrary";
import { loadIcon } from "./utils/loadIcon";
import { MdError } from "react-icons/md";
import { Icon } from "@utils/contentful";

const DynamicIcon: React.FC<Icon> = memo(
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
