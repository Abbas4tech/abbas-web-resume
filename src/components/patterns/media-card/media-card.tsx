import Link from "next/link";
import { memo } from "react";
import { MotionHover } from "@/components/elements/behavior/motion-hover/motion-hover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardTitle,
} from "@/components/elements/ui/card/card";
import { Icon } from "@/components/elements/ui/icon/icon";
import type { AdaptedLink } from "@/contentful/adapters/link";

export interface MediaCardProps {
  description: string;
  /** Stable identifier for list rendering (e.g. React keys in CardGrid). Not rendered. */
  id?: string;
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
    <MotionHover
      className="group/card block h-full w-full"
      scale={1.02}
      tapScale={0.98}
    >
      <Card className="h-full overflow-hidden border border-transparent transition-all duration-300 group-hover/card:border-primary/40 group-hover/card:shadow-primary/20 group-hover/card:shadow-xl">
        {thumbnailSrc && (
          <CardImage
            alt={thumbnailAlt}
            className="hidden transition-transform duration-500 group-hover/card:scale-105 md:block"
            height={thumbnailHeight}
            loading="lazy"
            src={thumbnailSrc}
            width={thumbnailWidth}
          />
        )}
        <CardContent className="p-4 md:p-6">
          <CardTitle className="text-base transition-colors duration-300 group-hover/card:text-primary md:text-lg">
            {title}
          </CardTitle>
          <CardDescription className="text-xs group-hover/card:text-secondary md:text-base">
            {description}
          </CardDescription>
          <CardFooter className="justify-end gap-2">
            {links?.map(({ id, href, icon }) => (
              <MotionHover key={id || href} scale={1.2} tapScale={0.9}>
                <Link href={href} target="_blank">
                  {icon && <Icon {...icon} />}
                </Link>
              </MotionHover>
            ))}
          </CardFooter>
        </CardContent>
      </Card>
    </MotionHover>
  )
);
MediaCard.displayName = "MediaCard";

export { MediaCard };
