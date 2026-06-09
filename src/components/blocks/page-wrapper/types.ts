import type { HTMLAttributes, ReactNode } from "react";
import type { PageNavButtonProps } from "@/components/patterns/page-nav-button/types";

export interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  pages: PageNavButtonProps["pages"];
}
