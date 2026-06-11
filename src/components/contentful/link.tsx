import NextLink from "next/link";
import type { ReactNode } from "react";
import type { AdaptedLink } from "@/contentful/adapters/link";

interface Props {
  children?: ReactNode;
  className?: string;
  data: AdaptedLink;
}

export function Link({ data, children, className }: Props) {
  const isExternal = data.href.startsWith("http");

  return (
    <NextLink
      className={className}
      href={data.href}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
    >
      {children || data.text}
    </NextLink>
  );
}
