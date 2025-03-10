import type { Config } from "tailwindcss";

const config: Config = {
  content: {
    files: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: [
      "tooltip-left",
      "w-4",
      "h-4",
      "lg:w-6",
      "lg:h-6",
      "block",
      "w-6",
      "h-6",
      "sm:w-8",
      "sm:h-8",
      "xl:block",
      "lg:hidden",
      "text-warning",
      "text-info",
      "text-success",
      "text-error",
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
