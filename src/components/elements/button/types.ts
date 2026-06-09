import type { LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type LinkButtonProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    asLink: true;
    href: LinkProps["href"];
  };

export type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asLink?: false;
};

export type ButtonProps = LinkButtonProps | NativeButtonProps;
