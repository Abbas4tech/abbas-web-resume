import { cn } from "@lib/utils";
import Link, { LinkProps } from "next/link";
import React from "react";

type typeLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asLink: true;
    href: LinkProps["href"];
  };

type typeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asLink?: false;
};

type ButtonProps = typeLinkProps | typeButtonProps;

const Button = React.memo(
  React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, asLink = false, ...props }, ref) => {
      if (asLink) {
        const { href, ...rest } = props as typeLinkProps;
        return (
          <Link
            href={href}
            className={cn(
              "capitalize text-base-content bg-base-300 inline-flex gap-2",
              className
            )}
            {...rest}
            ref={ref as React.Ref<HTMLAnchorElement>}
          />
        );
      }
      return (
        <button
          className={cn(
            "btn-sm btn md:btn-md text-sm md:text-base capitalize text-base-content bg-base-300 inline-flex gap-2",
            className
          )}
          {...(props as typeButtonProps)}
          ref={ref as React.Ref<HTMLButtonElement>}
        />
      );
    }
  )
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
