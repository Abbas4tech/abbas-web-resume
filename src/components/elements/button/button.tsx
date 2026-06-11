import Link, { type LinkProps } from "next/link";
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  forwardRef,
  memo,
  type Ref,
} from "react";
import { cn } from "@/lib/utils";

export type LinkButtonProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    asLink: true;
    href: LinkProps["href"];
  };

export type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asLink?: false;
};

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const Button = memo(
  forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, asLink = false, ...props }, ref) => {
      if (asLink) {
        const { href, ...rest } = props as LinkProps &
          AnchorHTMLAttributes<HTMLAnchorElement> & { asLink: true };
        return (
          <Link
            className={cn(
              "inline-flex gap-2 bg-base-300 text-base-content capitalize",
              className
            )}
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
          {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
          ref={ref as Ref<HTMLButtonElement>}
        />
      );
    }
  )
);
Button.displayName = "Button";

export { Button };
