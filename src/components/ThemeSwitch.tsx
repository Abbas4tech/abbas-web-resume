"use client";
import React, { ComponentProps, useState } from "react";

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
}

const Palette = (theme: string): React.JSX.Element => (
  <div
    data-tip="Theme"
    data-theme={theme}
    className="p-1 bg-base-100 border-base-content/10 border rounded-md grid grid-cols-2 gap-0.5 tooltip tooltip-primary"
  >
    <div className="size-1 md:size-1.5 rounded-md bg-base-content" />
    <div className="size-1 md:size-1.5 rounded-md bg-primary" />
    <div className="size-1 md:size-1.5 rounded-md bg-secondary" />
    <div className="size-1 md:size-1.5 rounded-md bg-accent" />
  </div>
);

const ThemeSwitch = ({
  themeList,
  defaultTheme,
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
      <DropdownToggle className="btn-ghost">
        {Palette(currentTheme)}
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
            className="text-sm gap-4 md:gap-6"
            onClick={() => themeChangeHandler(theme.toLowerCase())}
          >
            {theme}
            {Palette(theme.toLowerCase())}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeSwitch;
