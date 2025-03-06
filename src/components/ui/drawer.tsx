"use client";
import { cn } from "@lib/utils";
import React from "react";
import useIsMobile from "src/hooks/use-mobile";

const DRAWER_ID = "my-drawer-2";
const DRAWER_WIDTH = "20rem";
const DRAWER_WIDTH_MOBILE = "80%";

type DRAWER_STATE = "expanded" | "collapsed";

type DrawerContext = {
  state: DRAWER_STATE;
  setState: (val: DRAWER_STATE) => void;
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
  const [state, setState] = React.useState<"expanded" | "collapsed">(
    open ? "expanded" : "collapsed"
  );

  const toggleSidebar = React.useCallback(() => {
    setState((val) => "collapsed");
  }, [setState]);

  const contextValue = React.useMemo<DrawerContext>(
    () => ({ state, isMobile, toggleSidebar, setState }),
    [state, isMobile, toggleSidebar]
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

type DrawerProps = {
  side?: "left" | "right";
  variant?: "default" | "responsive";
};

const DrawerOverlay = React.memo(
  React.forwardRef<HTMLLabelElement, React.HTMLAttributes<HTMLLabelElement>>(
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

const DrawerToggle = React.memo(
  React.forwardRef<HTMLInputElement, React.HTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
      <input
        ref={ref}
        id={DRAWER_ID}
        className={cn("drawer-toggle", className)}
        type="checkbox"
        {...props}
      />
    )
  )
);

const DrawerButton = React.memo(
  React.forwardRef<HTMLLabelElement, React.HTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => {
      const { toggleSidebar } = useDrawer();
      return (
        <label
          ref={ref}
          onClick={toggleSidebar}
          tabIndex={0}
          className={cn("btn btn-ghost btn-circle drawer-button", className)}
          htmlFor={DRAWER_ID}
          {...props}
        />
      );
    }
  )
);

const Drawer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main"> & DrawerProps
>(
  (
    { side = "left", variant = "default", className, children, ...props },
    ref
  ) => {
    const data = useDrawer();
    console.log(data);
    const { isMobile, state, toggleSidebar, setState } = useDrawer();
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
    ({ className, children, ...props }, ref) => {
      const { toggleSidebar } = useDrawer();
      return (
        <div
          ref={ref}
          className={cn("drawer-side lg:top-0 top-16", className)}
          {...props}
        >
          <DrawerOverlay onClick={toggleSidebar} />
          <div className="min-h-full bg-base-300 py-4 flex flex-col w-[var(--drawer-mobile-width)] lg:w-[var(--drawer-width)]">
            {children}
          </div>
        </div>
      );
    }
  )
);

export { DrawerProvider, Drawer, DrawerButton, DrawerPageContent, DrawerSide };
export type { DrawerProps };
