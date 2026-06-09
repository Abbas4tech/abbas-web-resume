import type Image from "next/image";
import type { ComponentProps, HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement>;
export type CardContentProps = HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;
export type CardImageProps = ComponentProps<typeof Image>;
