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

import { useMobile } from "../hooks/use-mobile";
import { cn } from "../lib/utils";

const DRAWER_ID = "my-drawer-2";
const DRAWER_WIDTH = "20rem";
const DRAWER_WIDTH_MOBILE = "80%";

type DRAWER_STATE = "expanded" | "collapsed";
type DRAWER_VARIANTS = "default" | "dock-on-mobile";
type DRAWER_SIDES = "left" | "right";

interface DrawerContext {
  state: DRAWER_STATE;
  isMobile: boolean;
  toggleSidebar: () => void;
  side: DRAWER_SIDES;
  variant: DRAWER_VARIANTS;
}

const DrawerContext = createContext<DrawerContext | null>(null);

function useDrawer(): DrawerContext {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

type DrawerProviderProps = ComponentProps<"div"> & {
  side?: DRAWER_SIDES;
  variant?: DRAWER_VARIANTS;
};

const DrawerProvider = forwardRef<HTMLDivElement, DrawerProviderProps>(
  ({ className, style, children, variant = "default", side = "left", ...props }, ref) => {
    const isMobile = useMobile();
    const [open, setOpen] = useState(!isMobile);

    const checkForSidebarState = useCallback(() => (open ? "expanded" : "collapsed"), [open]);

    const toggleSidebar = useCallback(() => {
      setOpen((value) => !value);
    }, []);

    const contextValue = useMemo<DrawerContext>(
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
DrawerProvider.displayName = "SidebarProvider";

const DrawerOverlay = memo(
  forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(({ className, ...props }, ref) => (
    <label
      aria-label="close sidebar"
      className={cn("drawer-overlay", className)}
      htmlFor={DRAWER_ID}
      ref={ref}
      {...props}
    />
  ))
);
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerToggle = memo(
  forwardRef<HTMLInputElement, HTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
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
  })
);

const DrawerButton = memo(
  forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(({ className, ...props }, ref) => {
    const { variant, isMobile } = useDrawer();
    if (variant === "dock-on-mobile" && isMobile) {
      return <span className="sr-only">DrawerButton</span>;
    }
    return (
      <label
        className={cn("btn btn-ghost btn-circle drawer-button lg:hidden", className)}
        htmlFor={DRAWER_ID}
        ref={ref}
        {...props}
      >
        <span className="sr-only">Toggle menu</span>
      </label>
    );
  })
);

const Drawer = forwardRef<HTMLDivElement, ComponentProps<"main">>(
  ({ className, children, ...props }, ref) => {
    const { state, side } = useDrawer();
    return (
      <main
        className={cn("drawer lg:drawer-open", side === "right" && "drawer-end", className)}
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
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("drawer-content", className)} ref={ref} {...props} />
  ))
);

const DrawerSide = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
      const { variant, isMobile } = useDrawer();
      if (variant === "dock-on-mobile" && isMobile) {
        return <span className="sr-only">DrawerSide</span>;
      }
      return (
        <div className={cn("drawer-side top-16 lg:top-0", className)} ref={ref} {...props}>
          <DrawerOverlay />
          <div className="flex min-h-full w-(--drawer-mobile-width) flex-col bg-base-300 py-4 md:w-(--drawer-width)">
            {children}
          </div>
        </div>
      );
    }
  )
);

const DrawerSidebarFooter = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("", className)} ref={ref} {...props} />
  ))
);

DrawerSidebarFooter.displayName = "DrawerSidebarFooter";

const DrawerSideMenu = memo(
  forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(({ className, ...props }, ref) => (
    <ul className={cn("", className)} ref={ref} {...props} />
  ))
);

DrawerSideMenu.displayName = "DrawerSideMenu";

const DrawerSideItem = memo(
  forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(({ className, ...props }, ref) => {
    const { side } = useDrawer();
    return (
      <li
        className={cn(
          "py-1 pr-2 md:py-2",
          side === "right" && "pr-0 pl-2 *:flex-row-reverse",
          className
        )}
        data-aos={side === "left" ? "fade-right" : "fade-left"}
        ref={ref}
        {...props}
      />
    );
  })
);

DrawerSideItem.displayName = "DrawerSideItem";

export {
  DrawerProvider,
  Drawer,
  DrawerButton,
  DrawerPageContent,
  DrawerSide,
  DrawerSideItem,
  DrawerSideMenu,
  useDrawer,
};
export type { DRAWER_VARIANTS, DRAWER_SIDES };
