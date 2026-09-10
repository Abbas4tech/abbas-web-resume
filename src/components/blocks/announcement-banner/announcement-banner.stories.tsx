import type { Meta, StoryObj } from "@storybook/react";
import { AnnouncementBanner } from "./announcement-banner";
import { baseMock } from "./announcement-banner.mock";

const meta = {
  title: "Blocks/Announcement Banner",
  component: AnnouncementBanner,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AnnouncementBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Warning: Story = {
  args: {
    ...baseMock,
    variant: "warning",
    message: "Portfolio content is being updated — some links may be stale.",
    link: undefined,
  },
};

export const NoLink: Story = {
  args: {
    ...baseMock,
    link: undefined,
  },
};
