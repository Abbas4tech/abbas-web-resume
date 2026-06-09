"use client";
import {
  type ComponentProps,
  type CSSProperties,
  createContext,
  forwardRef,
  type HTMLAttributes,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import useMobile from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import type { DrawerContextValue, DrawerProviderProps } from "./types";

const DRAWER_ID = "my-drawer-2";
const DRAWER_WIDTH = "20rem";
const DRAWER_WIDTH_MOBILE = "80%";

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawer(): DrawerContextValue {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider.");
  }
  return context;
}

const DrawerProvider = forwardRef<HTMLDivElement, DrawerProviderProps>(
  (
    {
      className,
      style,
      children,
      variant = "default",
      side = "left",
      ...props
    },
    ref
  ) => {
    const isMobile = useMobile();
    const [open, setOpen] = useState(!isMobile);

    const checkForSidebarState = useCallback(
      () => (open ? "expanded" : "collapsed"),
      [open]
    );

    const toggleSidebar = useCallback(() => {
      setOpen((value) => !value);
    }, []);

    const contextValue = useMemo<DrawerContextValue>(
      () => ({
        state: checkForSidebarState(),
        isMobile,
        toggleSidebar,
        variant,
        side,
      }),
      [isMobile, toggleSidebar, checkForSidebarState, variant, side]
    );

    return (
      <DrawerContext.Provider value={contextValue}>
        <div
          className={cn("group", className)}
          data-side={side}
          data-variant={variant}
          ref={ref}
          style={
            {
              "--drawer-width": DRAWER_WIDTH,
              "--drawer-mobile-width": DRAWER_WIDTH_MOBILE,
              "--drawer-id": DRAWER_ID,
              ...style,
            } as CSSProperties
          }
          {...props}
        >
          {children}
        </div>
      </DrawerContext.Provider>
    );
  }
);
DrawerProvider.displayName = "DrawerProvider";

const DrawerOverlay = memo(
  forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => (
      <label
        aria-label="close sidebar"
        className={cn("drawer-overlay", className)}
        htmlFor={DRAWER_ID}
        ref={ref}
        {...props}
      >
        <span className="sr-only">Close sidebar</span>
      </label>
    )
  )
);
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerToggle = memo(
  forwardRef<HTMLInputElement, HTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
      const { state, toggleSidebar, variant, isMobile } = useDrawer();
      if (variant === "dock-on-mobile" && isMobile) {
        return <span className="sr-only">DrawerToggle</span>;
      }
      return (
        <input
          checked={state === "expanded"}
          className={cn("drawer-toggle", className)}
          id={DRAWER_ID}
          onChange={toggleSidebar}
          ref={ref}
          type="checkbox"
          {...props}
        />
      );
    }
  )
);
DrawerToggle.displayName = "DrawerToggle";

const DrawerButton = memo(
  forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => {
      const { variant, isMobile } = useDrawer();
      if (variant === "dock-on-mobile" && isMobile) {
        return <span className="sr-only">DrawerButton</span>;
      }
      return (
        <label
          aria-label="Open drawer"
          className={cn(
            "btn btn-ghost btn-circle drawer-button lg:hidden",
            className
          )}
          htmlFor={DRAWER_ID}
          ref={ref}
          {...props}
        >
          <span className="sr-only">Open drawer</span>
        </label>
      );
    }
  )
);
DrawerButton.displayName = "DrawerButton";

const Drawer = forwardRef<HTMLDivElement, ComponentProps<"main">>(
  ({ className, children, ...props }, ref) => {
    const { state, side } = useDrawer();
    return (
      <main
        className={cn(
          "drawer lg:drawer-open",
          side === "right" && "drawer-end",
          className
        )}
        data-state={state}
        ref={ref}
        {...props}
      >
        <DrawerToggle data-state={state} />
        {children}
      </main>
    );
  }
);
Drawer.displayName = "Drawer";

const DrawerPageContent = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("drawer-content", className)} ref={ref} {...props} />
    )
  )
);
DrawerPageContent.displayName = "DrawerPageContent";

const DrawerSide = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
      const { variant, isMobile } = useDrawer();
      if (variant === "dock-on-mobile" && isMobile) {
        return <span className="sr-only">DrawerSide</span>;
      }
      return (
        <div
          className={cn("drawer-side top-16 lg:top-0", className)}
          ref={ref}
          {...props}
        >
          <DrawerOverlay />
          <div className="flex min-h-full w-[var(--drawer-mobile-width)] flex-col bg-base-300 py-4 md:w-[var(--drawer-width)]">
            {children}
          </div>
        </div>
      );
    }
  )
);
DrawerSide.displayName = "DrawerSide";

const DrawerSidebarFooter = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("", className)} ref={ref} {...props} />
    )
  )
);
DrawerSidebarFooter.displayName = "DrawerSidebarFooter";

const DrawerSideMenu = memo(
  forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
    ({ className, ...props }, ref) => (
      <ul className={cn("", className)} ref={ref} {...props} />
    )
  )
);
DrawerSideMenu.displayName = "DrawerSideMenu";

const DrawerSideItem = memo(
  forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
    ({ className, children, ...props }, ref) => {
      const { toggleSidebar, side } = useDrawer();
      return (
        <li
          className={cn(
            "cursor-pointer py-1 pr-2 md:py-2",
            side === "right" && "pr-0 pl-2 *:flex-row-reverse",
            className
          )}
          data-aos={side === "left" ? "fade-right" : "fade-left"}
          ref={ref}
          {...props}
        >
          <button
            className="w-full text-left"
            onClick={toggleSidebar}
            type="button"
          >
            {children}
          </button>
        </li>
      );
    }
  )
);
DrawerSideItem.displayName = "DrawerSideItem";

export type { DrawerSides, DrawerVariants } from "./types";
export {
  Drawer,
  DrawerButton,
  DrawerPageContent,
  DrawerProvider,
  DrawerSide,
  DrawerSideItem,
  DrawerSideMenu,
  useDrawer,
};
