"use client";
import React, {
  ComponentProps,
  createContext,
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks";

const DRAWER_ID = "my-drawer-2";
const DRAWER_WIDTH = "20rem";
const DRAWER_WIDTH_MOBILE = "80%";

type DRAWER_STATE = "expanded" | "collapsed";
type DRAWER_VARIANTS = "default" | "responsive-sidebar" | "dock-on-mobile";
type DRAWER_SIDES = "left" | "right";

type DrawerContext = {
  state: DRAWER_STATE;
  isMobile: boolean;
  toggleSidebar: () => void;
  side: DRAWER_SIDES;
  variant: DRAWER_VARIANTS;
};

const DrawerContext = createContext<DrawerContext | null>(null);

function useDrawer(): DrawerContext {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

type DrawerProviderProps = ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "default" | "responsive-sidebar" | "dock-on-mobile";
};

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
    const alreadyOpened = variant !== "default";
    const [open, setOpen] = useState(alreadyOpened);

    const checkForSidebarState = useCallback(
      () =>
        variant === "responsive-sidebar"
          ? (!open && isMobile) || !isMobile
            ? "expanded"
            : "collapsed"
          : open
          ? "expanded"
          : "collapsed",
      [isMobile, open, variant]
    );

    const toggleSidebar = useCallback(() => {
      setOpen((value) => !value);
    }, [setOpen]);

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
          style={
            {
              "--drawer-width": DRAWER_WIDTH,
              "--drawer-mobile-width": DRAWER_WIDTH_MOBILE,
              "--drawer-id": DRAWER_ID,
              ...style,
            } as CSSProperties
          }
          className={cn("group", className)}
          ref={ref}
          data-variant={variant}
          data-side={side}
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
  forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => (
      <label
        ref={ref}
        htmlFor={DRAWER_ID}
        aria-label="close sidebar"
        className={cn("drawer-overlay", className)}
        {...props}
      />
    )
  )
);
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerToggle = memo(
  forwardRef<HTMLInputElement, HTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
      const { state, toggleSidebar } = useDrawer();
      return (
        <input
          ref={ref}
          id={DRAWER_ID}
          onChange={toggleSidebar}
          checked={state === "expanded"}
          className={cn("drawer-toggle", className)}
          type="checkbox"
          {...props}
        />
      );
    }
  )
);

const DrawerButton = memo(
  forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => {
      const { variant } = useDrawer();
      return (
        <label
          ref={ref}
          tabIndex={0}
          className={cn(
            "btn btn-ghost btn-circle drawer-button",
            variant === "responsive-sidebar" && "lg:hidden",
            className
          )}
          htmlFor={DRAWER_ID}
          {...props}
        />
      );
    }
  )
);

const Drawer = forwardRef<HTMLDivElement, ComponentProps<"main">>(
  ({ className, children, ...props }, ref) => {
    const { state, variant, side } = useDrawer();
    return (
      <main
        ref={ref}
        className={cn(
          "drawer",
          side === "right" && "drawer-end",
          variant === "responsive-sidebar" && "lg:drawer-open",
          className
        )}
        data-state={state}
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
      <div ref={ref} className={cn("drawer-content", className)} {...props} />
    )
  )
);

const DrawerSide = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
      const { variant } = useDrawer();
      return (
        <div
          ref={ref}
          className={cn(
            "drawer-side top-16",
            variant === "responsive-sidebar" && "md:top-0",
            className
          )}
          {...props}
        >
          <DrawerOverlay />
          <div className="min-h-full bg-base-300 py-4 flex flex-col w-[var(--drawer-mobile-width)] md:w-[var(--drawer-width)]">
            {children}
          </div>
        </div>
      );
    }
  )
);

const DrawerSidebarFooter = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("", className)} {...props} />
    )
  )
);

DrawerSidebarFooter.displayName = "DrawerSidebarFooter";

const DrawerSideMenu = memo(
  forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
    ({ className, ...props }, ref) => (
      <ul role="listbox" ref={ref} className={cn("", className)} {...props} />
    )
  )
);

DrawerSideMenu.displayName = "DrawerSideMenu";

const DrawerSideItem = memo(
  forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
    ({ className, ...props }, ref) => {
      const { toggleSidebar, side } = useDrawer();
      return (
        <li
          ref={ref}
          data-aos={side === "left" ? "fade-right" : "fade-left"}
          className={cn(
            "py-1 md:py-2 pr-2 cursor-pointer",
            side === "right" && "*:flex-row-reverse pl-2 pr-0",
            className
          )}
          onClick={toggleSidebar}
          {...props}
        />
      );
    }
  )
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
