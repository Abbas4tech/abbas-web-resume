"use client";
import { cn } from "@lib/utils";
import React from "react";
import useIsMobile from "src/hooks/use-mobile";

const DRAWER_ID = "my-drawer-2";
const DRAWER_WIDTH = "20rem";
const DRAWER_WIDTH_MOBILE = "80%";

type DRAWER_STATE = "expanded" | "collapsed";

type DrawerProps = React.ComponentProps<"main"> & {
  side?: "left" | "right";
  variant?: "default" | "responsive";
};

type DrawerContext = {
  state: DRAWER_STATE;
  isMobile: boolean;
  toggleSidebar: () => void;
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
  React.ComponentProps<"div">
>(({ className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(true);

  const toggleSidebar = React.useCallback(() => {
    setOpen((value) => !value);
  }, [setOpen]);

  const contextValue = React.useMemo<DrawerContext>(
    () => ({
      state: (!open && isMobile) || !isMobile ? "expanded" : "collapsed",
      isMobile,
      toggleSidebar,
    }),
    [open, isMobile, toggleSidebar]
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
        className={cn("drawer-context-provider", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </DrawerContext.Provider>
  );
});
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
          className={cn("btn btn-ghost btn-circle drawer-button", className)}
          htmlFor={DRAWER_ID}
          {...props}
        />
      );
    }
  )
);

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    { side = "left", variant = "default", className, children, ...props },
    ref
  ) => {
    const data = useDrawer();
    console.log(data);
    const { state } = useDrawer();
    return (
      <main
        ref={ref}
        className={cn(
          "drawer",
          side === "right" && "drawer-end",
          variant === "responsive" && "lg:drawer-open"
        )}
        data-state={state}
        data-variant={variant}
        data-side={side}
        {...props}
      >
        <DrawerToggle data-variant={variant} data-state={state} />
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
        className={cn("drawer-side lg:top-0 top-16", className)}
        {...props}
      >
        <DrawerOverlay />
        <div className="min-h-full bg-base-300 py-4 flex flex-col w-[var(--drawer-mobile-width)] lg:w-[var(--drawer-width)]">
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
          className={cn("py-1 md:py-2 pr-2 cursor-pointer", className)}
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
export type { DrawerProps };
