import Link from "next/link";
import { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
} from "@/components/elements/card/card";
import { Icon } from "@/components/elements/icon/icon";
import type { AdaptedLink } from "@/contentful/adapters/link";

export interface MediaCardProps {
  description: string;
  links?: AdaptedLink[];
  thumbnailAlt: string;
  thumbnailHeight: number;
  thumbnailSrc: string;
  thumbnailWidth: number;
  title: string;
}

const MediaCard = memo(
  ({
    title,
    description,
    thumbnailSrc,
    thumbnailAlt,
    thumbnailWidth,
    thumbnailHeight,
    links,
  }: MediaCardProps) => (
    <Card>
      <CardImage
        alt={thumbnailAlt}
        className="hidden md:block"
        height={thumbnailHeight}
        loading="lazy"
        src={thumbnailSrc}
        width={thumbnailWidth}
      />
      <CardContent className="p-4 md:p-6">
        <CardTitle className="text-base md:text-lg">{title}</CardTitle>
        <CardDescription className="text-xs md:text-base">
          {description}
        </CardDescription>
        <CardFooter className="justify-end gap-2">
          {links?.map(({ id, href, icon }) => (
            <Link href={href} key={id || href} target="_blank">
              {icon && <Icon {...icon} />}
            </Link>
          ))}
        </CardFooter>
      </CardContent>
    </Card>
  )
);
MediaCard.displayName = "MediaCard";

export { MediaCard };
