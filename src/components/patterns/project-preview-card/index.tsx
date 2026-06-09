import Link from "next/link";
import { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
} from "@/components/elements/card";
import { Icon } from "@/components/elements/icon";
import type { ProjectPreviewCardProps } from "./types";

const ProjectPreviewCard = memo(
  ({
    title,
    description,
    thumbnailSrc,
    thumbnailAlt,
    thumbnailWidth,
    thumbnailHeight,
    href,
    linkIcon,
  }: ProjectPreviewCardProps) => (
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
        <CardFooter className="justify-end">
          <Link href={href} target="_blank">
            <Icon {...linkIcon} />
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
  )
);
ProjectPreviewCard.displayName = "ProjectPreviewCard";

export { ProjectPreviewCard };
