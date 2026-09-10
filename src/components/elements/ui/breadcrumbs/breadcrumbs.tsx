import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

export type BreadcrumbsProps = HTMLAttributes<HTMLDivElement>;
export type BreadcrumbsListProps = HTMLAttributes<HTMLUListElement>;
export type BreadcrumbsItemProps = HTMLAttributes<HTMLLIElement>;

/** DaisyUI breadcrumbs wrapper */
const Breadcrumbs = memo(
  forwardRef<HTMLDivElement, BreadcrumbsProps>(
    ({ className, ...props }, ref) => (
      <div
        className={cn("breadcrumbs text-sm", className)}
        ref={ref}
        {...props}
      />
    )
  )
);
Breadcrumbs.displayName = "Breadcrumbs";

const BreadcrumbsList = memo(
  forwardRef<HTMLUListElement, BreadcrumbsListProps>((props, ref) => (
    <ul ref={ref} {...props} />
  ))
);
BreadcrumbsList.displayName = "BreadcrumbsList";

const BreadcrumbsItem = memo(
  forwardRef<HTMLLIElement, BreadcrumbsItemProps>((props, ref) => (
    <li ref={ref} {...props} />
  ))
);
BreadcrumbsItem.displayName = "BreadcrumbsItem";

export { Breadcrumbs, BreadcrumbsItem, BreadcrumbsList };
