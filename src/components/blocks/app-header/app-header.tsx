"use client";

import {
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
// biome-ignore lint/performance/noNamespaceImport: required for motion dynamic components
import * as motion from "motion/react-client";
import type { HTMLAttributes } from "react";
import { forwardRef, memo, useEffect, useState } from "react";
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
    ) => {
      // DaisyUI drawer-content is the actual scroll container, not window.
      // We find it at runtime to pass as the useScroll container.
      const [scrollContainer, setScrollContainer] =
        useState<HTMLElement | null>(null);

      useEffect(() => {
        // .drawer-content is rendered by DrawerPageContent
        const el = document.querySelector(".drawer-content");
        if (el instanceof HTMLElement) {
          setScrollContainer(el);
        }
      }, []);

      const { scrollY } = useScroll({
        container: scrollContainer ? { current: scrollContainer } : undefined,
      });
      const smoothScrollY = useSpring(scrollY, { stiffness: 120, damping: 20 });

      // Background transitions from transparent (y=0) to glass (y=60px of scroll)
      const bgOpacity = useTransform(smoothScrollY, [0, 60], [0, 0.92]);
      const blurPx = useTransform(smoothScrollY, [0, 60], [0, 14]);
      const shadowOpacity = useTransform(smoothScrollY, [0, 60], [0, 0.15]);

      const backdropFilter = useMotionTemplate`blur(${blurPx}px)`;
      const boxShadow = useMotionTemplate`0 4px 24px rgba(0,0,0,${shadowOpacity})`;

      return (
        <motion.header
          className={cn(
            "sticky top-0 z-30 flex w-full justify-center text-base-content md:p-2",
            className
          )}
          ref={ref}
          style={{
            backdropFilter,
            WebkitBackdropFilter: backdropFilter,
            boxShadow,
          }}
          /* biome-ignore lint/suspicious/noExplicitAny: bypass React vs Motion event handler type mismatch */
          {...(props as any)}
        >
          {/* Animated background fill that fades in on scroll */}
          <motion.div
            className="absolute inset-0 -z-10 bg-base-100"
            style={{ opacity: bgOpacity }}
          />
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
        </motion.header>
      );
    }
  )
);
AppHeader.displayName = "AppHeader";

export { AppHeader };
