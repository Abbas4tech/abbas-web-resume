import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import { MotionProvider } from "../src/components/elements/behavior/motion-provider/motion-provider";
import { DrawerProvider } from "../src/components/elements/ui/drawer/drawer";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    // The app is App Router only (src/app/). Without this, @storybook/nextjs-vite
    // mounts the Pages Router mock by default, and any component that calls
    // next/navigation's useRouter()/usePathname() (e.g. the usePage hook used by
    // SidebarNav, BottomDock, PageNavButton) throws "invariant expected app
    // router to be mounted" and the story's error boundary swallows the render.
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MotionProvider>
        <DrawerProvider side="left" variant="default">
          <Story />
        </DrawerProvider>
      </MotionProvider>
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
