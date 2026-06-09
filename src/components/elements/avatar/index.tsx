import Image from "next/image";
import { forwardRef, memo } from "react";

import { cn } from "@/lib/utils";
import type { AvatarImageProps, AvatarProps } from "./types";

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
