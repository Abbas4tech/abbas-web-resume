import NextImage from "next/image";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import {
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/elements/behavior/motion-stagger/motion-stagger";
import { Link } from "@/components/elements/ui/link/link";
import type { MockupShowcaseFrameVariant } from "@/components/patterns/mockup-showcase-frame/mockup-showcase-frame";
import { MockupShowcaseFrame } from "@/components/patterns/mockup-showcase-frame/mockup-showcase-frame";
import type { AdaptedLink } from "@/contentful/adapters/link";
import { cn } from "@/lib/utils";

export interface MockupGalleryItem {
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

export interface MockupGalleryProps extends HTMLAttributes<HTMLDivElement> {
  /** Which device/window mockup every item renders inside. */
  frame: Extract<MockupShowcaseFrameVariant, "browser" | "phone">;
  items: MockupGalleryItem[];
}

const MockupGallery = memo(
  forwardRef<HTMLDivElement, MockupGalleryProps>(
    ({ className, items, frame, ...props }, ref) => (
      <MotionStaggerContainer
        as="div"
        className={cn("my-2 grid grid-cols-1 gap-8 md:grid-cols-2", className)}
        ref={ref as React.Ref<HTMLElement>}
        {...props}
      >
        {items.map((item) => (
          <MotionStaggerItem key={item.id ?? item.title}>
            <MockupShowcaseFrame
              className="mx-auto w-full max-w-md"
              variant={frame}
            >
              {item.imageSrc && (
                <NextImage
                  alt={item.imageAlt}
                  className="h-full w-full object-cover"
                  height={item.imageHeight}
                  src={item.imageSrc}
                  width={item.imageWidth}
                />
              )}
            </MockupShowcaseFrame>
            <div className="mt-3 text-center">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              {item.description && (
                <p className="text-sm opacity-80">{item.description}</p>
              )}
              {item.links && item.links.length > 0 && (
                <div className="mt-1 flex justify-center gap-3">
                  {item.links.map((link) => (
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
MockupGallery.displayName = "MockupGallery";

export { MockupGallery };
