"use client";

import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  DropdownToggle,
} from "@abbas-web-resume/ui/components/dropdown";
import { Icon } from "@abbas-web-resume/ui/components/icon";
import type React from "react";
import { type ComponentProps, useState } from "react";
import type { Icon as IconResponse } from "@/types/common";

interface ThemeSwitchProps extends ComponentProps<typeof Dropdown> {
  defaultTheme: string;
  themeList: string[];
  themeIcon?: IconResponse;
}

const Palette = (theme: string): React.JSX.Element => (
  <div
    className="tooltip tooltip-primary grid grid-cols-2 gap-0.5 rounded-md border border-base-content/10 bg-base-100 p-1"
    data-theme={theme}
    data-tip="Theme"
  >
    <div className="size-1 rounded-md bg-base-content md:size-1.5" />
    <div className="size-1 rounded-md bg-primary md:size-1.5" />
    <div className="size-1 rounded-md bg-secondary md:size-1.5" />
    <div className="size-1 rounded-md bg-accent md:size-1.5" />
  </div>
);

const ThemeSwitch = ({
  themeList,
  defaultTheme,
  themeIcon,
  ...props
}: ThemeSwitchProps): React.JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme.toLowerCase());

  const themeChangeHandler = (theme: string = defaultTheme.toLowerCase()): void => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };
  return (
    <Dropdown {...props}>
      <DropdownToggle className="btn-ghost">
        {themeIcon ? <Icon {...themeIcon} /> : Palette(currentTheme)}
        <Icon classes={[]} iconCode="io5/IoChevronDown" name="arrow" showTooltip={false} />
      </DropdownToggle>
      <DropdownMenu>
        {themeList.map((theme) => (
          <DropdownMenuItem
            className="gap-4 text-sm md:gap-6"
            isActive={theme.toLowerCase() === currentTheme}
            key={theme}
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
