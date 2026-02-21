import { Button } from "@abbas-web-resume/ui/components/button";
import { DrawerButton } from "@abbas-web-resume/ui/components/drawer";
import { Icon } from "@abbas-web-resume/ui/components/icon";
import { cn } from "@abbas-web-resume/ui/lib/utils";
import { forwardRef, type HTMLAttributes, memo } from "react";
import type { AppData } from "@/types/entries";
import ThemeSwitch from "./theme-switch";

type GlobalHeaderProps = HTMLAttributes<HTMLElement> &
  Pick<AppData, "title" | "resume" | "resumeIcon" | "themeList" | "themeIcon" | "defaultTheme"> & {
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
          "sticky top-0 z-30 flex w-full justify-center bg-base-100 text-base-content shadow-base-300 shadow-lg md:p-2",
          className
        )}
      >
        <nav className="navbar bg-base-100 group-data-[side='right']:flex-row-reverse">
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
              href={resume.url}
              passHref
              target="_blank"
            >
              <Icon {...resumeIcon} />
            </Button>
            <ThemeSwitch defaultTheme={defaultTheme} themeIcon={themeIcon} themeList={themeList} />
          </div>
        </nav>
      </header>
    )
  )
);

GlobalHeader.displayName = "GlobalHeader";
export { GlobalHeader };
