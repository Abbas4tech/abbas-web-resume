import { cn } from "@/lib/utils";
import React from "react";
import { Button, ButtonProps } from "./button";
import { useDrawer } from "./drawer";

const Dropdown = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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

const DropdownToggle = React.memo(
  React.forwardRef<
    React.ComponentRef<typeof Button>,
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

const DropdownMenu = React.memo(
  React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
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

const DropdownMenuItem = React.memo(
  React.forwardRef<
    HTMLLIElement,
    React.HTMLAttributes<HTMLLIElement> & {
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
