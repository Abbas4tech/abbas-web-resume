"use client";
import React from "react";
import { DrawerButton } from "./ui/drawer";
import { Icon } from "./ui/icon";
import { Button } from "./ui/button";
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  DropdownToggle,
} from "./ui/dropdown";
import { ApplicationData } from "@lib/contentful";
import { cn } from "@lib/utils";

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  data: Pick<
    ApplicationData,
    | "title"
    | "resume"
    | "resumeIcon"
    | "themeIcon"
    | "themeList"
    | "defaultTheme"
  >;
};

const Header = React.memo(
  React.forwardRef<HTMLElement, HeaderProps>(
    ({ className, data, ...props }, ref) => {
      const { title, resume, resumeIcon, themeIcon, themeList, defaultTheme } =
        data;

      const [currentTheme, setCurrentTheme] = React.useState(
        defaultTheme.toLowerCase()
      );

      const themeChangeHandler = (
        theme: string = defaultTheme.toLowerCase()
      ) => {
        setCurrentTheme(theme);
        document.documentElement.setAttribute("data-theme", theme);
      };
      return (
        <header
          ref={ref}
          {...props}
          className={cn(
            "container mx-auto bg-base-100 shadow-lg shadow-base-300 text-base-content sticky top-0 z-30 flex w-full justify-center md:p-2",
            className
          )}
        >
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
                <Icon {...resumeIcon} />
              </Button>
              <Dropdown>
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
                    </DropdownMenuItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </nav>
        </header>
      );
    }
  )
);

Header.displayName = "Header";
export default Header;
