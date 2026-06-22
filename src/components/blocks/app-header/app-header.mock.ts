import type { IconProps } from "@/components/elements/ui/icon/icon";
import type { AppHeaderProps } from "./app-header";

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
