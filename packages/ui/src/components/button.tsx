import Link, { type LinkProps } from "next/link";
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  forwardRef,
  memo,
  type Ref,
} from "react";

import { cn } from "../lib/utils";

type typeLinkProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    asLink: true;
    href: LinkProps["href"];
  };

type typeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asLink?: false;
};

type ButtonProps = typeLinkProps | typeButtonProps;

const Button = memo(
  forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, asLink = false, ...props }, ref) => {
      if (asLink) {
        const { href, ...rest } = props as typeLinkProps;
        return (
          <Link
            className={cn("inline-flex gap-2 bg-base-300 text-base-content capitalize", className)}
            href={href}
            {...rest}
            ref={ref as Ref<HTMLAnchorElement>}
          />
        );
      }
      return (
        <button
          className={cn(
            "btn-sm btn md:btn-md inline-flex gap-2 bg-base-300 text-base-content text-sm capitalize md:text-base",
            className
          )}
          {...(props as typeButtonProps)}
          ref={ref as Ref<HTMLButtonElement>}
        />
      );
    }
  )
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
