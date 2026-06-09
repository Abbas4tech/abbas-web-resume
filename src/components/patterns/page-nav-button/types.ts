import type { PageLike, usePageProps } from "@/hooks/use-page";

export type PageNavItem = PageLike & { title: string };

export type PageNavButtonProps = usePageProps<PageNavItem> & {
  className?: string;
};
