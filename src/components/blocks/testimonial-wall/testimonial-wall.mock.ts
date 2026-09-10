import type { TestimonialWallProps } from "./testimonial-wall";

export const baseMock: TestimonialWallProps = {
  testimonials: [
    {
      author: "Ada Sparkline",
      meta: "Staff Engineer, Fixture Robotics",
      message:
        "Shipped ahead of schedule and the design system paid for itself within a quarter.",
      avatarSrc: "/fixtures/avatar.png",
      avatarAlt: "Ada Sparkline avatar",
    },
    {
      author: "Sam Fixture",
      meta: "Engineering Manager, Mock Market",
      message:
        "The clearest technical writing and the most reliable delivery on the team.",
    },
  ],
};
