import type { Meta, StoryObj } from "@storybook/react";
import { DrawerProvider } from "@/components/elements/ui/drawer/drawer";
import { BottomDock } from "./bottom-dock";
import { baseMock } from "./bottom-dock.mock";

const meta = {
  title: "Blocks/Bottom Dock",
  component: BottomDock,
  parameters: {
    layout: "fullscreen",
    // BottomDock only renders when the Drawer is in the "dock-on-mobile"
    // variant AND the viewport is actually narrower than the mobile
    // breakpoint (768px) — the global preview decorator uses the "default"
    // variant, so every story here needs its own DrawerProvider plus a
    // narrow viewport, or the component intentionally renders nothing.
    viewport: {
      value: "mobile1",
    },
  },
  decorators: [
    (Story) => (
      <DrawerProvider side="left" variant="dock-on-mobile">
        <Story />
      </DrawerProvider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof BottomDock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const ManyItems: Story = {
  args: {
    ...baseMock,
    items: [
      ...baseMock.items,
      {
        title: "Blog",
        pageUrl: "/blog",
        pageIcon: { iconCode: "fa/FaFileAlt", name: "Blog" },
      },
      {
        title: "Resume",
        pageUrl: "/resume",
        pageIcon: { iconCode: "fa/FaFilePdf", name: "Resume" },
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    ...baseMock,
    items: [baseMock.items[0]],
  },
};
