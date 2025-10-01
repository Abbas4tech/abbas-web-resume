import React, { forwardRef, HTMLAttributes, memo } from "react";

import { cn } from "@/lib/utils";
import { AppData } from "@/types/entries";

import { DrawerButton } from "./ui/drawer";
import { Icon } from "./ui/icon";
import { Button } from "./ui/button";
import ThemeSwitch from "./ThemeSwitch";

type GlobalHeaderProps = HTMLAttributes<HTMLElement> &
  Pick<
    AppData,
    | "title"
    | "resume"
    | "resumeIcon"
    | "themeList"
    | "themeIcon"
    | "defaultTheme"
  > & {
    defaultRoute: string;
  };

const GlobalHeader = memo(
  forwardRef<HTMLElement, GlobalHeaderProps>(
    (
      {
        className,
        title,
        resume,
        resumeIcon,
        themeList,
        themeIcon,
        defaultTheme,
        defaultRoute,
        ...props
      },
      ref
    ) => (
      <header
        ref={ref}
        {...props}
        className={cn(
          "bg-base-100 shadow-lg shadow-base-300 text-base-content sticky top-0 z-30 flex w-full justify-center md:p-2",
          className
        )}
      >
        <nav className="navbar group-data-[side='right']:flex-row-reverse bg-base-100">
          <div className="navbar-start group-data-[side='right']:flex-row-reverse gap-2">
            <DrawerButton className="">
              <Icon
                iconCode="io5/IoMenu"
                classes={["w-5", "h-5"]}
                name="Toggle"
                showTooltip={false}
              />
            </DrawerButton>

            <Button
              asLink
              href={defaultRoute}
              className="text-lg normal-case group-data-[variant='dock-on-mobile']:pl-2 lg:text-2xl p-0 md:p-2 btn-ghost btn bg-inherit"
            >
              {title}
            </Button>
          </div>

          <div className="navbar-end group-data-[side='right']:flex-row-reverse items-center gap-2">
            <Button
              asLink
              className="md:px-4 md:py-2 px-2 py-1 cursor-pointer btn btn-ghost bg-inherit"
              target="_blank"
              passHref
              href={resume.url}
            >
              <Icon {...resumeIcon} />
            </Button>
            <ThemeSwitch
              themeIcon={themeIcon}
              defaultTheme={defaultTheme}
              themeList={themeList}
            />
          </div>
        </nav>
      </header>
    )
  )
);

GlobalHeader.displayName = "GlobalHeader";
export { GlobalHeader };
