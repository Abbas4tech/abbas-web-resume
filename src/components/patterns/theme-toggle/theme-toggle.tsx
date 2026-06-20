"use client";
import { AnimatePresence } from "motion/react";
// biome-ignore lint/performance/noNamespaceImport: required for motion dynamic components
import * as motion from "motion/react-client";
import type React from "react";
import { type ComponentProps, useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  DropdownToggle,
} from "@/components/elements/dropdown/dropdown";
import type { IconProps } from "@/components/elements/icon/icon";
import { Icon } from "@/components/elements/icon/icon";

export interface ThemeToggleProps {
  defaultTheme: string;
  themeIcon?: IconProps;
  themes: string[];
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

const ThemeToggle = ({
  themes,
  defaultTheme,
  themeIcon,
  ...props
}: ThemeToggleProps & ComponentProps<typeof Dropdown>): React.JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme.toLowerCase());

  const handleThemeChange = (
    theme: string = defaultTheme.toLowerCase()
  ): void => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <Dropdown {...props}>
      <DropdownToggle className="btn-ghost">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: 15 }}
            initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
            key={currentTheme}
            style={{ display: "flex" }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {themeIcon ? <Icon {...themeIcon} /> : Palette(currentTheme)}
          </motion.div>
        </AnimatePresence>
        <Icon
          classes={[]}
          iconCode="io5/IoChevronDown"
          name="arrow"
          showTooltip={false}
        />
      </DropdownToggle>
      <DropdownMenu>
        {themes.map((theme) => (
          <DropdownMenuItem
            className="gap-4 text-sm capitalize md:gap-6"
            isActive={theme.toLowerCase() === currentTheme}
            key={theme}
            onClick={() => handleThemeChange(theme.toLowerCase())}
          >
            {theme}
            {Palette(theme.toLowerCase())}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle };
