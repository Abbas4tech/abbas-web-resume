import React from "react";
import {
  motion,
  AnimatePresence,
  Spring,
  HTMLMotionProps,
} from "framer-motion";
import { cn } from "@lib/utils";
import Link, { LinkProps } from "next/link";

const springConfig: Spring = {
  type: "spring",
  stiffness: 400,
  damping: 15,
  mass: 0.5,
};

const buttonVariants = {
  rest: {
    scale: 1,
    transition: springConfig,
  },
  hover: {
    scale: 1.05,
    transition: springConfig,
  },
  tap: {
    scale: 0.95,
    transition: springConfig,
  },
};

type TypeLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asLink: true;
    href: LinkProps["href"];
  };

type TypeButtonProps = HTMLMotionProps<"button"> & {
  asLink?: false;
};

type ButtonProps = TypeLinkProps | TypeButtonProps;

const Button = React.memo(
  React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, asLink = false, children, ...props }, ref) => {
      if (asLink) {
        const { href, ...rest } = props as TypeLinkProps;
        return (
          <Link
            href={href}
            className={cn(
              "capitalize text-base-content bg-base-300 inline-flex gap-2",
              className
            )}
            {...rest}
            ref={ref as React.Ref<HTMLAnchorElement>}
          >
            {children as React.ReactNode}
          </Link>
        );
      }
      return (
        <AnimatePresence>
          <motion.button
            className={cn(
              "btn-sm btn md:btn-md text-sm md:text-base capitalize text-base-content bg-base-300 inline-flex gap-2",
              className
            )}
            ref={ref as React.Ref<HTMLButtonElement>}
            initial="rest"
            animate="rest"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            layout
            {...(props as TypeButtonProps)}
          >
            {children}
          </motion.button>
        </AnimatePresence>
      );
    }
  )
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps, TypeButtonProps };
