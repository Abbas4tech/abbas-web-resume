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

export type DrawerProps = ComponentProps<"div">;
export type DrawerButtonProps = HTMLAttributes<HTMLLabelElement>;
export type DrawerPageContentProps = HTMLAttributes<HTMLDivElement>;
export type DrawerSideProps = HTMLAttributes<HTMLDivElement>;
export type DrawerSideMenuProps = HTMLAttributes<HTMLUListElement>;
export type DrawerSideItemProps = HTMLAttributes<HTMLLIElement>;

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
    // Not `useState(!isMobile)`: useMobile() can only know the real
    // viewport width after its own effect runs, so on every first render —
    // any device — `isMobile` reads as `false` and this would always
    // initialize to `true`. That's invisible on desktop (`lg:drawer-open`
    // forces the sidebar open regardless of this state) and on mobile with
    // the dock-on-mobile variant (the whole checkbox/overlay mechanism is
    // swapped for sr-only placeholders there), but between those — a
    // "tablet" width, off-canvas but not dock-on-mobile-hidden — it meant
    // the drawer's overlay defaulted open, blocking the page's own content
    // until the user dismissed it. Starting closed is correct everywhere
    // this state actually has any visible effect.
    const [open, setOpen] = useState(false);

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
          {props.children ?? <span className="sr-only">Open drawer</span>}
        </label>
      );
    }
  )
);
DrawerButton.displayName = "DrawerButton";

const Drawer = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => {
    const { state, side } = useDrawer();
    return (
      // A layout container for the drawer/sidebar chrome, not page content —
      // `<main>` belongs to PageWrapper's actual content region. Using it
      // here produced two <main> landmarks on every page (one nested inside
      // the other), an axe "landmark-no-duplicate-main" violation.
      <div
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
      </div>
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
      const { side } = useDrawer();
      return (
        <li
          className={cn(
            "cursor-pointer py-1 pr-2 md:py-2",
            side === "right" && "pr-0 pl-2 *:flex-row-reverse",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </li>
      );
    }
  )
);
DrawerSideItem.displayName = "DrawerSideItem";

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
