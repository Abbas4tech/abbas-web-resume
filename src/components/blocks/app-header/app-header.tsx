"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { Button } from "@/components/elements/button/button";
import { DrawerButton } from "@/components/elements/drawer/drawer";
import type { IconProps } from "@/components/elements/icon/icon";
import { Icon } from "@/components/elements/icon/icon";
import { ThemeToggle } from "@/components/patterns/theme-toggle/theme-toggle";
import { cn } from "@/lib/utils";

export interface AppHeaderProps extends HTMLAttributes<HTMLElement> {
  defaultRoute: string;
  defaultTheme: string;
  resumeIcon: IconProps;
  resumeUrl: string;
  themeIcon?: IconProps;
  themes: string[];
  title: string;
}

const AppHeader = memo(
  forwardRef<HTMLElement, AppHeaderProps>(
    (
      {
        className,
        title,
        resumeUrl,
        resumeIcon,
        themes,
        themeIcon,
        defaultTheme,
        defaultRoute,
        ...props
      },
      ref
    ) => (
      <header
        className={cn(
          "sticky top-0 z-30 flex w-full justify-center text-base-content md:p-2",
          className
        )}
        ref={ref}
        {...props}
      >
        <nav className="navbar w-full bg-transparent group-data-[side='right']:flex-row-reverse">
          <div className="navbar-start gap-2 group-data-[side='right']:flex-row-reverse">
            <DrawerButton className="">
              <Icon
                classes={["w-5", "h-5"]}
                iconCode="io5/IoMenu"
                name="Toggle"
                showTooltip={false}
              />
            </DrawerButton>
            <Button
              asLink
              className="btn-ghost btn bg-inherit p-0 text-lg normal-case group-data-[variant='dock-on-mobile']:pl-2 md:p-2 lg:text-2xl"
              href={defaultRoute}
            >
              {title}
            </Button>
          </div>
          <div className="navbar-end items-center gap-2 group-data-[side='right']:flex-row-reverse">
            <Button
              asLink
              className="btn btn-ghost cursor-pointer bg-inherit px-2 py-1 md:px-4 md:py-2"
              href={resumeUrl}
              passHref
              target="_blank"
            >
              <Icon {...resumeIcon} />
            </Button>
            <ThemeToggle
              defaultTheme={defaultTheme}
              themeIcon={themeIcon}
              themes={themes}
            />
          </div>
        </nav>
      </header>
    )
  )
);
AppHeader.displayName = "AppHeader";

export { AppHeader };
