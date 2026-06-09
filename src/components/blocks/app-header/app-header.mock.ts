import type { IconProps } from "@/components/elements/icon/types";
import type { AppHeaderProps } from "./types";

const mockResumeIcon: IconProps = {
  iconCode: "md/MdOutlineDocumentScanner",
  name: "Resume",
  showTooltip: true,
};

const mockThemeIcon: IconProps = {
  iconCode: "md/MdOutlineColorLens",
  name: "Theme",
  showTooltip: true,
};

export const baseMock: AppHeaderProps = {
  title: "Abbas Portfolio",
  defaultRoute: "/",
  defaultTheme: "dark",
  resumeIcon: mockResumeIcon,
  themeIcon: mockThemeIcon,
  resumeUrl: "https://example.com/resume.pdf",
  themes: [
    "light",
    "dark",
    "cupcake",
    "synthwave",
    "cyberpunk",
    "valentine",
    "aqua",
  ],
};
