import type { MetricsStripProps } from "./metrics-strip";

export const baseMock: MetricsStripProps = {
  stats: [
    {
      label: "Years of experience",
      value: "5+",
      icon: { iconCode: "md/MdWork", name: "Experience" },
    },
    {
      label: "Projects shipped",
      value: "30+",
      icon: { iconCode: "fa/FaCode", name: "Projects" },
    },
    {
      label: "Open source stars",
      value: "1.2k",
      icon: { iconCode: "fa/FaStar", name: "Stars" },
    },
    {
      label: "Cups of coffee",
      value: "∞",
      icon: { iconCode: "md/MdFavorite", name: "Coffee" },
    },
  ],
};
