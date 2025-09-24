import React, { ComponentProps, useState } from "react";

import { Icon as IconResponse } from "@/types/common";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownMenuItem,
} from "./ui/dropdown";
import { Icon } from "./ui/icon";

interface ThemeSwitchProps extends ComponentProps<typeof Dropdown> {
  defaultTheme: string;
  themeList: string[];
  themeIcon: IconResponse;
}

const ThemeSwitch = ({
  themeList,
  defaultTheme,
  themeIcon,
  ...props
}: ThemeSwitchProps): React.JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme.toLowerCase());

  const themeChangeHandler = (
    theme: string = defaultTheme.toLowerCase()
  ): void => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };
  return (
    <Dropdown {...props}>
      <DropdownToggle>
        <Icon {...themeIcon} />
        <Icon
          classes={[]}
          iconCode="io5/IoChevronDown"
          showTooltip={false}
          name="arrow"
        />
      </DropdownToggle>
      <DropdownMenu>
        {themeList.map((theme) => (
          <DropdownMenuItem
            isActive={theme.toLowerCase() === currentTheme}
            key={theme}
            onClick={() => themeChangeHandler(theme.toLowerCase())}
          >
            {theme}
            <div
              data-theme={theme.toLowerCase()}
              className="p-1 bg-base-100 rounded-md flex gap-[2px]"
            >
              <div className="size-1 md:size-2 rounded-md bg-base-content" />
              <div className="size-1 md:size-2 rounded-md bg-primary" />
              <div className="size-1 md:size-2 rounded-md bg-secondary" />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeSwitch;
