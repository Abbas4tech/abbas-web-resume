import type { AvailabilityBannerProps } from "./availability-banner";

export const baseMock: AvailabilityBannerProps = {
  message: "Open to new roles",
  statusColor: "success",
};

export const withCountdownMock: AvailabilityBannerProps = {
  message: "Available from",
  statusColor: "warning",
  daysUntil: 15,
};
