import Image from "next/image";
import {
  type ComponentProps,
  type ComponentRef,
  forwardRef,
  type HTMLAttributes,
  memo,
} from "react";

import { cn } from "@/lib/utils";

const Card = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("card bg-base-300 shadow-md", className)} ref={ref} {...props} />
  ))
);

const CardContent = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("card-body", className)} ref={ref} {...props} />
  ))
);

const CardImage = memo(
  forwardRef<ComponentRef<typeof Image>, ComponentProps<typeof Image>>(
    ({ className, src, alt, loading, ...props }, ref) => (
      <figure className="card-image">
        <Image alt={alt} className={className} loading={loading} ref={ref} src={src} {...props} />
      </figure>
    )
  )
);

const CardTitle = memo(
  forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h2 className={cn("card-title", className)} ref={ref} {...props} />
    )
  )
);

const CardDescription = memo(
  forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
      <p className={cn("card-description", className)} ref={ref} {...props} />
    )
  )
);

const CardFooter = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("card-actions", className)} ref={ref} {...props} />
  ))
);

export { Card, CardTitle, CardContent, CardDescription, CardImage, CardFooter };
