import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";

import { DrawerProvider } from "../src/components/elements/ui/drawer/drawer";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <DrawerProvider side="left" variant="default">
        <Story />
      </DrawerProvider>
    ),
    withThemeByDataAttribute({
      themes: {
        light: "light",
        dark: "dark",
        cupcake: "cupcake",
        dracula: "dracula",
        night: "night",
        bumblebee: "bumblebee",
        emerald: "emerald",
        corporate: "corporate",
        synthwave: "synthwave",
        retro: "retro",
        cyberpunk: "cyberpunk",
        valentine: "valentine",
        halloween: "halloween",
        garden: "garden",
        forest: "forest",
        aqua: "aqua",
        lofi: "lofi",
        pastel: "pastel",
        fantasy: "fantasy",
        wireframe: "wireframe",
        black: "black",
        luxury: "luxury",
        cmyk: "cmyk",
        autumn: "autumn",
        business: "business",
        coffee: "coffee",
        winter: "winter",
        caramellatte: "caramellatte",
        abyss: "abyss",
        silk: "silk",
      },
      defaultTheme: "dark",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;
