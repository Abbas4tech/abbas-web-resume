import { cn } from "@lib/utils";
import Image from "next/image";
import React from "react";

const Card = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          "hover:before:!bg-slate-900 before:!bg-transparent card image-full before:transition-colors before:ease-in-out before:duration-500",
          className
        )}
        {...props}
      />
    )
  )
);

const CardContent = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          "card-body p-4 md:p-6 opacity-0 hover:opacity-100",
          className
        )}
        {...props}
      />
    )
  )
);

const CardImage = React.memo(
  React.forwardRef<
    HTMLElement & React.ComponentRef<typeof Image>,
    React.HTMLAttributes<HTMLElement> & React.ComponentProps<typeof Image>
  >(({ className, src, alt, ...props }, ref) => (
    <figure className={cn("", className)} ref={ref}>
      <Image src={src} alt={alt} {...props} />
    </figure>
  ))
);

const CardTitle = React.memo(
  React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
  >(({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("card-title", className)} {...props} />
  ))
);

const CardDescription = React.memo(
  React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
  >(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("card-description", className)} {...props} />
  ))
);

const CardFooter = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn("card-actions", className)} {...props}></div>
    )
  )
);

export { Card, CardTitle, CardContent, CardDescription, CardImage, CardFooter };
