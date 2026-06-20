import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import type { MediaCardProps } from "@/components/patterns/media-card/media-card";
import { MediaCard } from "@/components/patterns/media-card/media-card";
import { cn } from "@/lib/utils";

export interface CardGridProps extends HTMLAttributes<HTMLDivElement> {
  animation?: string;
  cards: MediaCardProps[];
}

const CardGrid = memo(
  forwardRef<HTMLDivElement, CardGridProps>(
    ({ className, animation, cards, ...props }, ref) => (
      <div
        className={cn(
          "my-2 grid grid-cols-1 gap-4 rounded-xl md:grid-cols-2",
          className
        )}
        data-aos={animation}
        ref={ref}
        {...props}
      >
        {cards.map((card) => (
          <MediaCard key={card.title} {...card} />
        ))}
      </div>
    )
  )
);
CardGrid.displayName = "CardGrid";

export { CardGrid };
