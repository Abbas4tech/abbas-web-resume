import { type ComponentRef, forwardRef, type HTMLAttributes, memo } from "react";

import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "./button";
import { useDrawer } from "./drawer";

const Dropdown = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
    const { side } = useDrawer();
    return (
      <div
        className={cn("dropdown", side === "left" ? "dropdown-end" : "dropdown-start", className)}
        ref={ref}
        {...props}
      />
    );
  })
);

const DropdownToggle = memo(
  forwardRef<ComponentRef<typeof Button>, Extract<ButtonProps, { asLink?: false }>>(
    ({ className, ...props }, ref) => (
      <Button
        className={cn("md:btn mx-2 md:m-1", className)}
        ref={ref}
        role="button"
        tabIndex={0}
        {...props}
      />
    )
  )
);

const DropdownMenu = memo(
  forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(({ className, ...props }, ref) => (
    <ul
      className={cn(
        "dropdown-content menu z-[1] w-max rounded-box bg-base-300 p-2 shadow-2xl",
        className
      )}
      ref={ref}
      role="menu"
      tabIndex={0}
      {...props}
    />
  ))
);

const DropdownMenuItem = memo(
  forwardRef<
    HTMLLIElement,
    HTMLAttributes<HTMLLIElement> & {
      isActive?: boolean;
    }
  >(({ className, children, isActive = false, ...props }, ref) => (
    <li
      className={cn("menu-sm md:menu-md font-bold", className)}
      ref={ref}
      role="menuitem"
      {...props}
    >
      <span
        className={cn(
          "justify-between gap-4",
          isActive &&
            "gradient-45 animate-gradient-x bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-transparent ease-in-out"
        )}
      >
        {children}
      </span>
    </li>
  ))
);

export { Dropdown, DropdownToggle, DropdownMenu, DropdownMenuItem };
