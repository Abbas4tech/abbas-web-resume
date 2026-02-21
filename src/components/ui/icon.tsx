import React, { forwardRef, HTMLAttributes, memo, useMemo } from "react";
import { IconBaseProps } from "react-icons";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import { Icon as IconResponse } from "@/types/common";
import { iconMap, IconName, getFallbackIcon } from "@/helper/icon-mapping";

const Icon = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & IconResponse>(
    ({ className, iconCode = "", classes, showTooltip = true, name }, ref) => {
      const cleanClasses = (classes || []).map((c) => c.trim()).join(" ");

      const IconComponent = useMemo(() => {
        if (iconCode && iconMap[iconCode as IconName]) {
          return dynamic<IconBaseProps>(iconMap[iconCode as IconName], {
            ssr: false,
            loading: () => (
              <div
                className={cn(
                  "w-4 h-4 bg-gray-200 animate-pulse rounded",
                  cleanClasses
                )}
                aria-label="Loading icon"
              />
            ),
          });
        }

        console.warn(
          `Icon "${iconCode}" not found in icon map. Using fallback.`
        );
        return dynamic<IconBaseProps>(getFallbackIcon, {
          ssr: false,
        });
      }, [iconCode, cleanClasses]);

      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-center",
            showTooltip && "tooltip tooltip-primary",
            className
          )}
          tabIndex={showTooltip ? 0 : -1}
          data-tip={showTooltip ? name : undefined}
        >
          <IconComponent
            className={cleanClasses}
            aria-label={name}
            role="img"
            title={name}
          />
        </div>
      );
    }
  )
);

Icon.displayName = "DynamicIcon";

export { Icon };
