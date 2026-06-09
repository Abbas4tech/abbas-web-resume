import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

export type DropdownProps = HTMLAttributes<HTMLDivElement>;
export type DropdownToggleProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type DropdownMenuProps = HTMLAttributes<HTMLUListElement>;
export type DropdownMenuItemProps = HTMLAttributes<HTMLLIElement> & {
  isActive?: boolean;
};
