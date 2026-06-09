import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

const Menu = memo(
  forwardRef<HTMLUListElement, HTMLAttributes<HTMLUListElement>>(
    ({ className, ...props }, ref) => (
      <ul className={cn("menu", className)} ref={ref} {...props} />
    )
  )
);
Menu.displayName = "Menu";
const MenuItem = memo(
  forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>(
    ({ className, ...props }, ref) => (
      <li className={cn("", className)} ref={ref} {...props} />
    )
  )
);
MenuItem.displayName = "MenuItem";

export { Menu, MenuItem };
