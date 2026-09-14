import NextImage from "next/image";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import {
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/elements/behavior/motion-stagger/motion-stagger";
import { Link } from "@/components/elements/ui/link/link";
import type { AdaptedLink } from "@/contentful/adapters/link";
import { cn } from "@/lib/utils";

export interface CarouselSlideProps {
  description?: string;
  /** Stable identifier for list rendering (e.g. React keys). Not rendered. */
  id?: string;
  imageAlt: string;
  imageHeight: number;
  imageSrc: string;
  imageWidth: number;
  links?: AdaptedLink[];
  title: string;
}

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  slides: CarouselSlideProps[];
}

const Carousel = memo(
  forwardRef<HTMLDivElement, CarouselProps>(
    ({ className, slides, ...props }, ref) => (
      <MotionStaggerContainer
        as="div"
        className={cn("carousel w-full rounded-xl", className)}
        ref={ref as React.Ref<HTMLElement>}
        {...props}
      >
        {slides.map((slide) => (
          <MotionStaggerItem
            className="carousel-item relative w-full"
            key={slide.id ?? slide.title}
          >
            {slide.imageSrc && (
              <NextImage
                alt={slide.imageAlt}
                className="h-full w-full object-cover"
                height={slide.imageHeight}
                src={slide.imageSrc}
                width={slide.imageWidth}
              />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white md:p-6">
              <h3 className="font-semibold text-lg md:text-2xl">
                {slide.title}
              </h3>
              {slide.description && (
                <p className="text-sm md:text-base">{slide.description}</p>
              )}
              {slide.links && slide.links.length > 0 && (
                <div className="mt-2 flex gap-3">
                  {slide.links.map((link) => (
                    <Link
                      className="link link-hover"
                      href={link.href}
                      key={link.id || link.href}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </MotionStaggerItem>
        ))}
      </MotionStaggerContainer>
    )
  )
);
Carousel.displayName = "Carousel";

export { Carousel };
