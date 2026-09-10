import type { Meta, StoryObj } from "@storybook/react";
import { AvailabilityBanner } from "./availability-banner";
import { baseMock, withCountdownMock } from "./availability-banner.mock";

const meta = {
  title: "Blocks/Availability Banner",
  component: AvailabilityBanner,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AvailabilityBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const WithCountdown: Story = {
  args: {
    ...withCountdownMock,
  },
};

export const NotAvailable: Story = {
  args: {
    message: "Not looking right now",
    statusColor: "error",
  },
};
