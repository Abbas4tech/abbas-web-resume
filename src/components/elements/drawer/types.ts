import type { ComponentProps, HTMLAttributes } from "react";

export type DrawerState = "expanded" | "collapsed";
export type DrawerVariants = "default" | "dock-on-mobile";
export type DrawerSides = "left" | "right";

export interface DrawerContextValue {
  isMobile: boolean;
  side: DrawerSides;
  state: DrawerState;
  toggleSidebar: () => void;
  variant: DrawerVariants;
}

export type DrawerProviderProps = ComponentProps<"div"> & {
  side?: DrawerSides;
  variant?: DrawerVariants;
};

export type DrawerProps = ComponentProps<"main">;
export type DrawerButtonProps = HTMLAttributes<HTMLLabelElement>;
export type DrawerPageContentProps = HTMLAttributes<HTMLDivElement>;
export type DrawerSideProps = HTMLAttributes<HTMLDivElement>;
export type DrawerSideMenuProps = HTMLAttributes<HTMLUListElement>;
export type DrawerSideItemProps = HTMLAttributes<HTMLLIElement>;
