import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import {
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/elements/behavior/motion-stagger/motion-stagger";
import type { MediaCardProps } from "@/components/patterns/media-card/media-card";
import { MediaCard } from "@/components/patterns/media-card/media-card";
import { cn } from "@/lib/utils";

export interface CardGridProps extends HTMLAttributes<HTMLDivElement> {
  cards: MediaCardProps[];
}

const CardGrid = memo(
  forwardRef<HTMLDivElement, CardGridProps>(
    ({ className, cards, ...props }, ref) => (
      <MotionStaggerContainer
        as="div"
        className={cn(
          "my-2 grid grid-cols-1 gap-4 rounded-xl md:grid-cols-2",
          className
        )}
        ref={ref as React.Ref<HTMLDivElement>}
        {...props}
      >
        {cards.map((card) => (
          <MotionStaggerItem key={card.id ?? card.title}>
            <MediaCard {...card} />
          </MotionStaggerItem>
        ))}
      </MotionStaggerContainer>
    )
  )
);
CardGrid.displayName = "CardGrid";

export { CardGrid };
