import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef,
  memo,
  Ref,
} from "react";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";

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
            href={href}
            className={cn(
              "capitalize text-base-content bg-base-300 inline-flex gap-2",
              className
            )}
            {...rest}
            ref={ref as Ref<HTMLAnchorElement>}
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
          ref={ref as Ref<HTMLButtonElement>}
        />
      );
    }
  )
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
