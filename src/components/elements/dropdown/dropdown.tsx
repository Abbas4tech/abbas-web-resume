import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";
import { useDrawer } from "../drawer/drawer";

export type DropdownProps = HTMLAttributes<HTMLDivElement>;
export type DropdownToggleProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type DropdownMenuProps = HTMLAttributes<HTMLUListElement>;
export type DropdownMenuItemProps = HTMLAttributes<HTMLLIElement> & {
  isActive?: boolean;
};

const Dropdown = memo(
  forwardRef<HTMLDivElement, DropdownProps>(({ className, ...props }, ref) => {
    const { side } = useDrawer();
    return (
      <div
        className={cn(
          "dropdown",
          side === "left" ? "dropdown-end" : "dropdown-start",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  })
);
Dropdown.displayName = "Dropdown";

const DropdownToggle = memo(
  forwardRef<HTMLButtonElement, DropdownToggleProps>(
    ({ className, ...props }, ref) => (
      <button
        className={cn("btn md:btn mx-2 md:m-1", className)}
        ref={ref}
        // biome-ignore lint/a11y/noRedundantRoles: false positive
        role="button"
        tabIndex={0}
        {...props}
      />
    )
  )
);
DropdownToggle.displayName = "DropdownToggle";

const DropdownMenu = memo(
  forwardRef<HTMLUListElement, DropdownMenuProps>(
    ({ className, ...props }, ref) => (
      <ul
        className={cn(
          "dropdown-content menu z-[1] w-max rounded-box bg-base-300 p-2 shadow-2xl",
          className
        )}
        ref={ref}
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: false positive
        role="menu"
        tabIndex={0}
        {...props}
      />
    )
  )
);
DropdownMenu.displayName = "DropdownMenu";

const DropdownMenuItem = memo(
  forwardRef<HTMLLIElement, DropdownMenuItemProps>(
    ({ className, children, isActive = false, ...props }, ref) => (
      // biome-ignore lint/a11y/useFocusableInteractive: false positive
      <li
        className={cn("menu-sm md:menu-md font-bold", className)}
        ref={ref}
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: false positive
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
    )
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export { Dropdown, DropdownMenu, DropdownMenuItem, DropdownToggle };
