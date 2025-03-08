"use client";
import React, { memo } from "react";
import { useApplicationData } from "@context";
import { DrawerButton } from "../ui/drawer";
import { Icon } from "../ui/icon";
import { Button } from "../ui/button";
import DynamicIcon from "../dynamic-icons/DynamicIcon";
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  DropdownToggle,
} from "../ui/dropdown";

const Header = memo(() => {
  const { title, resume, resumeIcon, themeIcon, themeList, defaultTheme } =
    useApplicationData();

  const [currentTheme, setCurrentTheme] = React.useState(
    defaultTheme.toLowerCase()
  );

  const themeChangeHandler = (theme: string = defaultTheme.toLowerCase()) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };
  return (
    <header className="container mx-auto bg-base-100 shadow-lg shadow-base-300 text-base-content sticky top-0 z-30 flex w-full justify-center md:p-2">
      <nav className="navbar bg-base-100">
        <div className="navbar-start gap-2">
          <DrawerButton className="lg:hidden">
            <Icon
              iconCode="io5/IoMenu"
              classes={["w-5", "h-5"]}
              name="Toggle"
              showTooltip={false}
            />
          </DrawerButton>

          <Button
            asLink
            href={"/"}
            className="text-lg normal-case lg:text-2xl p-0 md:p-2 btn-ghost btn bg-inherit"
          >
            {title}
          </Button>
        </div>

        <div className="navbar-end items-center gap-2">
          <Button
            asLink
            className="md:px-4 md:py-2 px-2 py-1 cursor-pointer btn btn-ghost bg-inherit"
            target="_blank"
            passHref
            href={`https:${resume.file.url}`}
          >
            <DynamicIcon {...resumeIcon} />
          </Button>
          <Dropdown>
            <DropdownToggle>
              <DynamicIcon {...themeIcon} />
              <DynamicIcon
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
                </DropdownMenuItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
