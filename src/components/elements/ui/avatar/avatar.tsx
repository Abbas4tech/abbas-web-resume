import Image from "next/image";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";

export type AvatarSize = "xs" | "sm" | "md" | "lg";
export type AvatarRounded = "full" | "xl" | "lg" | "md" | "sm" | "none";

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  ring?: string;
  size?: AvatarSize;
};

export type AvatarImageProps = HTMLAttributes<HTMLDivElement> & {
  src: string;
  alt: string;
  width: number;
  height: number;
  rounded?: AvatarRounded;
};

const Avatar = memo(
  forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, ring, size = "md", ...props }, ref) => (
      <div
        className={cn(
          "avatar",
          ring && `ring ring-${ring} ring-offset-2 ring-offset-base-100`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  )
);
Avatar.displayName = "Avatar";

const AvatarImage = memo(
  forwardRef<HTMLDivElement, AvatarImageProps>(
    (
      { className, src, alt, width, height, rounded = "full", ...props },
      ref
    ) => (
      <div className={cn(`rounded-${rounded}`, className)} ref={ref} {...props}>
        <Image alt={alt} height={height} src={src} width={width} />
      </div>
    )
  )
);
AvatarImage.displayName = "AvatarImage";

export { Avatar, AvatarImage };
