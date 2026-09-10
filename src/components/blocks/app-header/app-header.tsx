import type { HTMLAttributes } from "react";
import { MotionHover } from "@/components/elements/behavior/motion-hover/motion-hover";
import { MotionWrapper } from "@/components/elements/behavior/motion-wrapper/motion-wrapper";
import { Button } from "@/components/elements/ui/button/button";
import { DrawerButton } from "@/components/elements/ui/drawer/drawer";
import type { IconProps } from "@/components/elements/ui/icon/icon";
import { Icon } from "@/components/elements/ui/icon/icon";
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

export function AppHeader({
  className,
  title,
  resumeUrl,
  resumeIcon,
  themes,
  themeIcon,
  defaultTheme,
  defaultRoute,
  ...props
}: AppHeaderProps) {
  return (
    <MotionWrapper
      animation="fade-up"
      as="header"
      className={cn(
        "sticky top-0 z-30 flex w-full justify-center bg-base-200 text-base-content md:p-2",
        className
      )}
      {...props}
    >
      <nav className="navbar w-full bg-transparent group-data-[side='right']:flex-row-reverse">
        <div className="navbar-start gap-2 group-data-[side='right']:flex-row-reverse">
          <MotionHover scale={1.08} tapScale={0.92}>
            <DrawerButton className="">
              <Icon
                classes={["w-5", "h-5"]}
                iconCode="io5/IoMenu"
                name="Toggle"
                showTooltip={false}
              />
            </DrawerButton>
          </MotionHover>
          <MotionHover scale={1.03} tapScale={0.97}>
            <Button
              asLink
              className="btn-ghost btn bg-inherit p-0 text-lg normal-case group-data-[variant='dock-on-mobile']:pl-2 md:p-2 lg:text-2xl"
              href={defaultRoute}
            >
              {title}
            </Button>
          </MotionHover>
        </div>
        <div className="navbar-end items-center gap-2 group-data-[side='right']:flex-row-reverse">
          <MotionHover scale={1.08} tapScale={0.92}>
            <Button
              asLink
              className="btn btn-ghost cursor-pointer bg-inherit px-2 py-1 md:px-4 md:py-2"
              href={resumeUrl}
              passHref
              target="_blank"
            >
              <Icon {...resumeIcon} />
            </Button>
          </MotionHover>
          <ThemeToggle
            defaultTheme={defaultTheme}
            themeIcon={themeIcon}
            themes={themes}
          />
        </div>
      </nav>
    </MotionWrapper>
  );
}
