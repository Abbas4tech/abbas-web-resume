import NextImage from "next/image";
import type { AdaptedImage } from "@/contentful/adapters/image";

interface Props {
  className?: string;
  data: AdaptedImage;
  priority?: boolean;
}

export function Image({ data, className, priority }: Props) {
  if (!data.url) {
    return null;
  }

  return (
    <NextImage
      alt={data.alternativeText || data.title || "Image"}
      className={className}
      height={data.height || 600}
      priority={priority}
      src={data.url}
      width={data.width || 800}
    />
  );
}
