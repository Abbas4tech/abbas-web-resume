import { cn } from "@/lib/utils";
import React, { ComponentRef, forwardRef, HTMLAttributes, memo } from "react";
import { Button, ButtonProps } from "./button";
import { useDrawer } from "./drawer";

const Dropdown = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
      const { side } = useDrawer();
      return (
        <div
          ref={ref}
          className={cn(
            "dropdown",
            side === "left" ? "dropdown-end" : "dropdown-start",
            className
          )}
          {...props}
        />
      );
    }
  )
);

const DropdownToggle = memo(
  forwardRef<
    ComponentRef<typeof Button>,
    Extract<ButtonProps, { asLink?: false }>
  >(({ className, ...props }, ref) => (
    <Button
      ref={ref}
      role="button"
      tabIndex={0}
      className={cn("md:btn md:m-1 mx-2", className)}
      {...props}
    />
  ))
);

const DropdownMenu = memo(
  forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
    ({ className, ...props }, ref) => (
      <ul
        ref={ref}
        role="menu"
        tabIndex={0}
        className={cn(
          "dropdown-content menu bg-base-300 rounded-box w-max z-[1] p-2 shadow-2xl",
          className
        )}
        {...props}
      />
    )
  )
);

const DropdownMenuItem = memo(
  forwardRef<
    HTMLLIElement,
    HTMLAttributes<HTMLLIElement> & {
      isActive?: boolean;
    }
  >(({ className, children, isActive = false, ...props }, ref) => (
    <li
      role="menuitem"
      ref={ref}
      className={cn("menu-sm md:menu-md font-bold", className)}
      {...props}
    >
      <span
        className={cn(
          "justify-between",
          isActive &&
            "text-transparent font-bold bg-clip-text bg-gradient-to-r from-primary to-secondary gradient-45 animate-gradient-x ease-in-out"
        )}
      >
        {children}
      </span>
    </li>
  ))
);

export { Dropdown, DropdownToggle, DropdownMenu, DropdownMenuItem };
