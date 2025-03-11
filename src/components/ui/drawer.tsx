"use client";
import { cn } from "@lib/utils";
import React from "react";
import { useMobile } from "@hooks";

const DRAWER_ID = "my-drawer-2";
const DRAWER_WIDTH = "20rem";
const DRAWER_WIDTH_MOBILE = "80%";

type DRAWER_STATE = "expanded" | "collapsed";

type DrawerContext = {
  state: DRAWER_STATE;
  isMobile: boolean;
  toggleSidebar: () => void;
  side: "left" | "right";
  variant: "default" | "responsive-sidebar" | "dock-on-mobile";
};

const DrawerContext = React.createContext<DrawerContext | null>(null);

function useDrawer() {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

const DrawerProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "default" | "responsive-sidebar" | "dock-on-mobile";
  }
>(
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
    let alreadyOpened = false;
    if (variant !== "default") {
      alreadyOpened = true;
    }
    const [open, setOpen] = React.useState(alreadyOpened);

    const checkForSidebarState = React.useCallback(() => {
      if (variant === "responsive-sidebar") {
        return (!open && isMobile) || !isMobile ? "expanded" : "collapsed";
      } else {
        return open ? "expanded" : "collapsed";
      }
    }, [isMobile, open, variant]);

    const toggleSidebar = React.useCallback(() => {
      setOpen((value) => !value);
    }, [setOpen]);

    const contextValue = React.useMemo<DrawerContext>(
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
            } as React.CSSProperties
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

const DrawerOverlay = React.memo(
  React.forwardRef<HTMLLabelElement, React.HTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => {
      return (
        <label
          ref={ref}
          htmlFor={DRAWER_ID}
          aria-label="close sidebar"
          className={cn("drawer-overlay", className)}
          {...props}
        />
      );
    }
  )
);
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerToggle = React.memo(
  React.forwardRef<HTMLInputElement, React.HTMLAttributes<HTMLInputElement>>(
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

const DrawerButton = React.memo(
  React.forwardRef<HTMLLabelElement, React.HTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => {
      return (
        <label
          ref={ref}
          tabIndex={0}
          className={cn(
            "btn btn-ghost btn-circle drawer-button group-data-[variant='responsive-sidebar']:lg:hidden",
            className
          )}
          htmlFor={DRAWER_ID}
          {...props}
        />
      );
    }
  )
);

const Drawer = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(
  ({ className, children, ...props }, ref) => {
    const { state } = useDrawer();
    return (
      <main
        ref={ref}
        className={cn(
          "drawer group-data-[side='right']:drawer-end group-data-[variant='responsive-sidebar']:lg:drawer-open"
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

const DrawerPageContent = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("drawer-content", className)} {...props} />
    )
  )
);

const DrawerSide = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          "drawer-side group-data-[variant='responsive-sidebar']:md:top-0 top-16",
          className
        )}
        {...props}
      >
        <DrawerOverlay />
        <div className="min-h-full bg-base-300 py-4 flex flex-col w-[var(--drawer-mobile-width)] md:w-[var(--drawer-width)]">
          {children}
        </div>
      </div>
    )
  )
);

const DrawerSidebarFooter = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("", className)} {...props} />
    )
  )
);

DrawerSidebarFooter.displayName = "DrawerSidebarFooter";

const DrawerSideMenu = React.memo(
  React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
    ({ className, ...props }, ref) => (
      <ul role="listbox" ref={ref} className={cn("", className)} {...props} />
    )
  )
);

DrawerSideMenu.displayName = "DrawerSideMenu";

const DrawerSideItem = React.memo(
  React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
    ({ className, ...props }, ref) => {
      const { toggleSidebar } = useDrawer();
      return (
        <li
          ref={ref}
          data-aos="fade-right"
          className={cn(
            "py-1 md:py-2 pr-2 cursor-pointer group-data-[side='right']:*:flex-row-reverse",
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
