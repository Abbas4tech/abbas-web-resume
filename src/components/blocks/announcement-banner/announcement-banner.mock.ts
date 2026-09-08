import type { AnnouncementBannerProps } from "./announcement-banner";

export const baseMock: AnnouncementBannerProps = {
  message: "Open to new full-stack opportunities starting next month.",
  variant: "success",
  icon: { iconCode: "md/MdWork", name: "Availability" },
  link: {
    __typename: "Link",
    id: "announcement-cta",
    internalName: "Announcement CTA",
    text: "Get in touch",
    href: "/contact",
    icon: undefined,
  },
};
