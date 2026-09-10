import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { adaptTestimonialWall } from "./testimonial-wall.adapter";

describe("adaptTestimonialWall", () => {
  it("adapts generic ContentList to TestimonialWallProps", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Ada Sparkline",
          subtitle: "Staff Engineer, Fixture Robotics",
          description: "Shipped ahead of schedule.",
          image: {
            url: "/avatar.jpg",
            alternativeText: "Ada Sparkline avatar",
            title: "Avatar",
          },
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptTestimonialWall(input);

    expect(result.testimonials).toHaveLength(1);
    expect(result.testimonials[0]).toEqual({
      author: "Ada Sparkline",
      meta: "Staff Engineer, Fixture Robotics",
      message: "Shipped ahead of schedule.",
      avatarSrc: "/avatar.jpg",
      avatarAlt: "Ada Sparkline avatar",
    });
  });

  it("handles missing optional fields", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Minimal Testimonial",
          description: "A quote.",
        },
      ],
    } as AdaptedContentList;

    const result = adaptTestimonialWall(input);
    expect(result.testimonials[0].meta).toBeUndefined();
    expect(result.testimonials[0].avatarSrc).toBeUndefined();
  });
});
