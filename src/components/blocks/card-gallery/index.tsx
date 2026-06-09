import { forwardRef, memo } from "react";
import { PageContent } from "@/components/elements/page";
import { ProjectPreviewCard } from "@/components/patterns/project-preview-card";
import { cn } from "@/lib/utils";
import type { CardGalleryProps } from "./types";

const CardGallery = memo(
  forwardRef<HTMLDivElement, CardGalleryProps>(
    ({ className, animation, cards, ...props }, ref) => (
      <PageContent
        className={cn(
          "my-2 grid grid-cols-1 gap-4 rounded-xl md:grid-cols-2",
          className
        )}
        data-aos={animation}
        ref={ref}
        {...props}
      >
        {cards.map((card) => (
          <ProjectPreviewCard key={card.title} {...card} />
        ))}
      </PageContent>
    )
  )
);
CardGallery.displayName = "CardGallery";

export { CardGallery };
