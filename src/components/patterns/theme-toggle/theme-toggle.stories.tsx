import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "./index";
import { baseMock } from "./theme-toggle.mock";

const meta = {
  title: "Patterns/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const ManyThemes: Story = {
  args: {
    ...baseMock,
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
    ],
  },
};
