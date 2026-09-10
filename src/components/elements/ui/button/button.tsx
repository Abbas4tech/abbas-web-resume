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

// DaisyUI color/style variants (e.g. "btn-primary") set their own
// background and text color via component-layer CSS. Tailwind's utility
// layer always wins over the component layer regardless of class order in
// the HTML, so this component's own default `bg-base-300 text-base-content`
// would silently override any variant a caller passes — twMerge can't
// catch this conflict either, since it only recognizes plain Tailwind
// utilities, not DaisyUI's component classes. Skip the hardcoded default
// whenever the caller has already asked for a variant.
const DAISYUI_VARIANT_PATTERN =
  /\bbtn-(primary|secondary|accent|neutral|info|success|warning|error|ghost|outline|link)\b/;

const Button = memo(
  forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, asLink = false, ...props }, ref) => {
      const hasVariant = className
        ? DAISYUI_VARIANT_PATTERN.test(className)
        : false;

      if (asLink) {
        const { href, ...rest } = props as LinkProps &
          AnchorHTMLAttributes<HTMLAnchorElement> & { asLink: true };
        return (
          <Link
            className={cn(
              "inline-flex gap-2 capitalize",
              !hasVariant && "bg-base-300 text-base-content",
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
            "btn-sm btn md:btn-md inline-flex gap-2 text-sm capitalize md:text-base",
            !hasVariant && "bg-base-300 text-base-content",
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
