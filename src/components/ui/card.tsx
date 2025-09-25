import React, {
  ComponentProps,
  ComponentRef,
  forwardRef,
  HTMLAttributes,
  memo,
} from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

const Card = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn("card shadow-md bg-base-300", className)}
        {...props}
      />
    )
  )
);

const CardContent = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("card-body", className)} {...props} />
    )
  )
);

const CardImage = memo(
  forwardRef<
    HTMLElement & ComponentRef<typeof Image>,
    HTMLAttributes<HTMLElement> & ComponentProps<typeof Image>
  >(({ className, src, alt, ...props }, ref) => (
    <figure className={cn("", className)} ref={ref}>
      <Image src={src} className="" alt={alt} {...props} />
    </figure>
  ))
);

const CardTitle = memo(
  forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h2 ref={ref} className={cn("card-title", className)} {...props} />
    )
  )
);

const CardDescription = memo(
  forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
      <p ref={ref} className={cn("card-description", className)} {...props} />
    )
  )
);

const CardFooter = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("card-actions", className)} {...props} />
    )
  )
);

export { Card, CardTitle, CardContent, CardDescription, CardImage, CardFooter };
