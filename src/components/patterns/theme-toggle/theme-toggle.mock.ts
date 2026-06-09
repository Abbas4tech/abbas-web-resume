import type { ThemeToggleProps } from "./types";

export const baseMock: ThemeToggleProps = {
  defaultTheme: "dark",
  themes: ["light", "dark", "cupcake", "synthwave"],
  themeIcon: { iconCode: "md/MdColorLens", name: "Theme" },
};
